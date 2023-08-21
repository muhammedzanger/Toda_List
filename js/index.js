let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");


// create empty array to store the tasks
let arrayOfTasks = [];

// chech if localstorage has data
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

// trigger get data from local storage
getDataFromLocalStorage();


// Add Task
submit.onclick = function () {
    if(input.value !== " ") {
        addTasksToArray(input.value);    /*add tasks to array of tasks*/
        input.value = "";  /*emty input field*/
    };
};

// click on task element
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("dele")) {
        // remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("task-id"));
        // remove element from page
        e.target.parentElement.remove();
        // task element
        if (e.target.classList.contains("task")){
            // toggle completed the task
            toggleStatusTaskWith(e.target.getAttribute("task-id"))
            // toggle class list
            e.target.classList.toggle("done");
        }
    }
})

function addTasksToArray(taskText) {
    // task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // add tasks to localstorage
    addDataToLocalStorageFrom(arrayOfTasks);
    // console.log(arrayOfTasks)
    // console.log(JSON.stringify(arrayOfTasks))
};

function addElementsToPageFrom(arrayOfTasks) {
    // empty tasksdiv
    tasksDiv.innerHTML = '';
    // looping of arrayoftasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // check the task has class done
        if (task.completed) {
            div.className = "task done";
        };
        div.setAttribute("task-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create span btn delete
        let span = document.createElement("span")
        span.className = "dele";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        // append div to tasksdiv container
        tasksDiv.appendChild(div);
    });
};


// add data to localstorage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks));
}

// get data from local storage
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    // for refrance
    // for (let i = 0 ; i < arrayOfTasks.length; i++){
        // console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    // };
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
};

function toggleStatusTaskWith(taskId) {
    for (let i = 0 ; i < arrayOfTasks.length ; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed = false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        };
    };
    addDataToLocalStorageFrom(arrayOfTasks);
};