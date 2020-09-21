let textAdding = document.querySelector(".text-adding");
let text = "";
let count = Number(localStorage.getItem("newNote_count"));
let todo = [];

if (count === null) {
  localStorage.setItem("newNote_count", 0);
  count = 0;
}

for (let index = 1; index <= count; index++) {
  text = localStorage.getItem("newNote_value[" + index + "]");
  // console.log(text)

  $("ul").append(
    '<li class="new-todo" data-order =' +
      index +
      ">" +
      '<div class="input-group form-group mb-3">' +
      '<div class="input-group-prepend input-group-text">' +
      '<input class="checkbox" id="1" type="checkbox" />' +
      '<textarea name="text" rows="2" cols="100" class="form-control new-note">' +
      text +
      "</textarea>" +
      '<div class="input-group-append remove-button">' +
      '<button class="btn btn-outline-secondary deleteNote" type="button" id="inputGroupFileAddon04">X</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</li>"
  );
}

//add note by Enter key
$(document).ready(function () {
  $(textAdding).on("keypress", function (event) {
    if (event.which === 13) {
      event.preventDefault();
      let temp = {};
      temp.check = false;
      let i = todo.length;
      todo[i] = temp;
      let text = $(this).val();
      let count = Number(localStorage.getItem("newNote_count"));

      if (text !== "") {
        //what to add to ul
        $("ul").append(
          '<li class="new-todo" data-order =' +
            count +
            ">" +
            '<div class="input-group form-group mb-3">' +
            '<div class="input-group-prepend input-group-text">' +
            '<input class="checkbox" id="1" type="checkbox" />' +
            '<textarea name="text" rows="2" cols="100" class="form-control new-note">' +
            text +
            "</textarea>" +
            '<div class="input-group-append remove-button">' +
            '<button class="btn btn-outline-secondary deleteNote" type="button" id="inputGroupFileAddon04">X</button>' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</li>"
        );
        console.log(count)
        //add/save count and note to localStorage
        localStorage.setItem("newNote_count", ++count);
        localStorage.setItem("newNote_value[" + count + "]", text);
       
        console.log(count)
        localStorage.setItem("todo", JSON.stringify(todo));
       
      } else {
        alert("Please add a note");
      }

      $(textAdding).val("");
    }
  });

  //add note by clicking "save" button
  document.querySelector(".add-note").onclick = function () {
    let text = $(".text-adding").val();
    let count = Number(localStorage.getItem("newNote_count"));

    if (text !== "") {
      $("ul").append(
        '<li class="new-todo"  data-order = "' +
          count++ +
          '"' +
          ">" +
          '<div class="input-group form-group mb-3">' +
          '<div class="input-group-prepend input-group-text">' +
          '<input class="checkbox" id="1" type="checkbox" />' +
          '<textarea name="text" rows="2" cols="100" class="form-control new-note">' +
          text +
          "</textarea>" +
          '<div class="input-group-append remove-button">' +
          '<button class="btn btn-outline-secondary deleteNote" type="button" id="inputGroupFileAddon04">X</button>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</li>"
      );
      localStorage.setItem("newNote_count", ++count);
      localStorage.setItem("newNote_value[" + count + "]", text);
      let temp = {};
      temp.check = false;
      let i = todo.length;
      todo[i] = temp;

      localStorage.setItem("todo[" + count + "]", JSON.stringify(todo));

      $(textAdding).val("");
    } else alert("Please add a note");
  };

  //delete note from site and localStorage
  $("ul").on("click", ".remove-button", function () {
    let newText = $(this).closest("li").data("order");
    count = Number(localStorage.getItem("newNote_count"));
    localStorage.removeItem("newNote_value[" + ++newText + "]"); //delete exact note from localStorage
    localStorage.setItem("newNote_count", --count); //reduce count of notes
    this.closest("li").remove(); //delete note from site
  });

  //if update note, to save updated text to localStorage
  $("ul").on("input", ".new-note", ".new-todo", function () {
    let text = $(this).val();
    let newText = $(this).closest("li").data("order"); //taking number of li
    localStorage.setItem("newNote_value[" + ++newText + "]", text); //input updated text to localStorage
  });

  if (localStorage.getItem("todo")) {
    todo = JSON.parse(localStorage.getItem("todo"));
  }

  //disable note which is done,by clicking "checkbox"
  $("ul").on("click", ".checkbox", function () {
    let checkbox = document.querySelectorAll(".checkbox");
    for (let index = 0; index < checkbox.length; index++) {
      //add attribute "disabled" to li
      if ($(checkbox[index]).is(":checked")) {
        todo[index].check = true;
        $(checkbox[index])
          .closest("li")
          .find("textarea")
          .attr("disabled", true);
      } else {
        todo[index].check = false;
        $(checkbox[index])
          .closest("li")
          .find("textarea")
          .removeAttr("disabled");
      }
      localStorage.setItem("todo", JSON.stringify(todo));
    }
  });
  window.onload = function () {
    let checkbox = document.querySelectorAll(".checkbox");

    for (const key in todo) {
      if (todo[key].check == true) {
        $(checkbox[key]).attr("checked", "checked");
        $(checkbox[key]).closest("li").find("textarea").attr("disabled", true);
      } else {
        $(checkbox[key]).removeAttr("checked");
        $(checkbox[key]).closest("li").find("textarea").attr("disabled", false);
      }
    }
  };
  // };

  //to clear all notes from site and localStorage
  document.querySelector(".clear").onclick = function () {
    localStorage.clear();
    $("#todo").find("ul").text("");
  };

  //to be able to move notes up and down

  $(function () {
    $("ul").sortable();
    $("ul").disableSelection();
    
  });
});
