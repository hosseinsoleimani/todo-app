const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todoBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerHTML = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const displayTodo = () => {
  todoBody.innerHTML = "";
  if (!todos.length) {
    todoBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
    return;
  }

  todos.forEach((todo) => {
    todoBody.innerHTML += `<tr>
    <td>${todo.task}</td>
    <td>${todo.date || "No date"}</td>
    <td>${todo.completed ? "completed" : "pending"}</td>
    <td>
    <button>Edit</button>   
    <button>Do</button>
    <button onclick="deleteHandler('${todo.id}')">Delete</button>
    </td>
    </tr>`;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    completed: false,
    task,
    date,
  };

  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodo();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("todo added successfully", "success");
  } else {
    showAlert("please enter a todo", "error");
  }
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodo();
  showAlert("todo deleted successfuly", "success");
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodo();
    showAlert("All todos deleted successfully", "success");
  } else {
    showAlert("No task to delete", "error");
  }
};

addButton.addEventListener("click", addHandler);
window.addEventListener("load", displayTodo);
deleteAllButton.addEventListener("click", deleteAllHandler);
