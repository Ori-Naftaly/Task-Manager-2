// Selectors

const formInput = document.querySelector(".todo-input");
const submitBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
submitBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions

function addTodo(event) {
  event.preventDefault();
  if (formInput.value === "") {
    return (formInput.placeholder = "Try again, no task added");
  } else {
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    //add div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // add li
    let newTodo = document.createElement("li");
    newTodo.innerText = `${formInput.value}`;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //  add todo to local storage

    saveLocal(formInput.value);

    // completed button
    const compBtn = document.createElement("button");
    compBtn.innerHTML = '<i class="fas fa-check"></i>';
    compBtn.classList.add("comp-button");
    todoDiv.appendChild(compBtn);

    //Delete Button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add("del-button");
    todoDiv.appendChild(delBtn);

    //Append Div to list

    todoList.appendChild(todoDiv);

    //clear input value
    formInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] === "del-button") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocal(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "comp-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "finished":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unfinished":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Check local storage

function saveLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    formInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("comp-button");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("del-button");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
