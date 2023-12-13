// script.js

function addTodo() {
    var newTaskInput = document.getElementById("new-task");
    var taskText = newTaskInput.value;

    if (taskText.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var todoList = document.getElementById("todo-list");

    var li = document.createElement("li");
    li.className = "todo-item";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    var textSpan = document.createElement("span");
    textSpan.textContent = taskText;

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        todoList.removeChild(li);
    };

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    newTaskInput.value = "";
}
