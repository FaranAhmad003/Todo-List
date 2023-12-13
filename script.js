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
        updateLocalStorage();
    };

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    updateLocalStorage();

    newTaskInput.value = "";
}
function updateLocalStorage() {
    var todoList = document.getElementById("todo-list");
    var tasks = [];

    // Iterate through each task and store its text content
    todoList.querySelectorAll(".todo-item span").forEach(function(task) {
        tasks.push(task.textContent);
    });

    // Save the tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// script.js

window.onload = function() {
    loadTasks();
};

function loadTasks() {
    var todoList = document.getElementById("todo-list");
    var tasks = localStorage.getItem("tasks");

    // If there are tasks in local storage, add them to the todo list
    if (tasks) {
        tasks = JSON.parse(tasks);

        tasks.forEach(function(taskText) {
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
                updateLocalStorage();
            };

            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }
}



