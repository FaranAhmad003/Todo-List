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
    checkbox.addEventListener("change", function() {
        handleTaskCompletionNotification(taskText);
    });

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

function handleTaskCompletionNotification(taskText) {
    if (Notification.permission === "granted") {
        console.log(taskText);
        alert("Task has been added");
        notifyMe(taskText);
        var notification = new Notification("Task Completed", {
            body: "Task: " + taskText + " has been completed!",
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            var notification; // Declare the variable here

            if (permission === "granted") {
                notification = new Notification("Task Completed", {
                    body: "Todo List Task: " + taskText + " has been completed!",
                    icon: "icon.png",
                    timeout: 5000, // 5 seconds
                });
                console.log("Notification triggered for task: " + taskText);
            }
        });
    }
}


function updateLocalStorage() {
    var todoList = document.getElementById("todo-list");
    var tasks = [];
    todoList.querySelectorAll(".todo-item span").forEach(function(task) {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function() {
    loadTasks();
};

function loadTasks() {
    var todoList = document.getElementById("todo-list");
    var tasks = localStorage.getItem("tasks");
    if (tasks) {
        tasks = JSON.parse(tasks);

        tasks.forEach(function(taskText) {
            var li = document.createElement("li");
            li.className = "todo-item";

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function() {
                handleTaskCompletionNotification(taskText);
            });

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
function notifyMe(taskText) {

    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        const notification = new Notification("Task Completed", {
            body: "Task: " + taskText + " has been completed!",
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                const notification = new Notification("Task Completed", {
                    body: "Task: " + taskText + " has been completed!",
                });
                
            }
        });
    }
}
