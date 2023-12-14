
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
        var notification = new Notification("Task Completed", {
            body: "Task: " + taskText + " has been completed!",
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                var notification = new Notification("Task Completed", {
                    body: "Task: " + taskText + " has been completed!",
                });
            }
        });
    }
}
function handleTaskCompletionNotification(taskText) {
    Push.create("Task Completed", {
        body: "Todo List Task: " + taskText + " has been completed!",
        icon: "icon.png",
        timeout: 5000, // 5 seconds
    });
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



