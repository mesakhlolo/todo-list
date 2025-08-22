import "./css/styles.css";

import { addNewProject } from "./modules/projectManager.js";
import { addNewTodo, createTodo } from "./modules/todoManager.js";
import { renderTodos } from "./modules/domRenderer.js";

const addTaskForm = document.querySelector(".add-task-form");
const taskInput = addTaskForm.querySelector("#add-task-title");
const descriptionInput = document.querySelector("#add-task-description");
const dateInput = document.querySelector("#add-task-date");
const addProjectBtn = document.querySelector(".add-project-btn");

// default selected project
let selectedProject = "Default";

// user add a new project
addProjectBtn.addEventListener("click", function () {
  const projectName = prompt("Input name for a new project:");
  if (projectName === null) return;

  addNewProject(projectName);
});

// user add a new todo
addTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = taskInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dateInput.value;
  const priority = document.querySelector(
    "input[name='priority']:checked"
  )?.value;

  if (!title || !priority) {
    alert("Tasks and Priorities must be filled!");
    return;
  }

  const todo = createTodo(title, description, dueDate, priority);
  addNewTodo(selectedProject, todo);

  renderTodos(selectedProject);
  addTaskForm.reset();
});

// user select a project
document
  .querySelector(".project-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("list-project")) {
      selectedProject = event.target.textContent;
      renderTodos(selectedProject);
    }
  });
