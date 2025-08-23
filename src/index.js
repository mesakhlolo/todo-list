import "./css/styles.css";

import { addNewProject } from "./modules/projectManager.js";
import { addNewTodo, createTodo } from "./modules/todoManager.js";
import { renderProjects, renderTodos } from "./modules/domRenderer.js";

const addTaskForm = document.querySelector(".add-task-form");
const taskInput = addTaskForm.querySelector("#add-task-title");
const descriptionInput = document.querySelector("#add-task-description");
const dateInput = document.querySelector("#add-task-date");

const addProjectBtn = document.querySelector(".add-project-btn");
const projectForm = document.querySelector(".add-project-form");
const cancelProjectForm = document.querySelector(".cancel-project-form");

// default selected project
let selectedProject = "Default";

// flow ketika user add a new project
// show new project form
addProjectBtn.addEventListener("click", function () {
  // tampilkan form
  projectForm.classList.add("show");
});
// cancel new project form
cancelProjectForm.addEventListener("click", function () {
  // sembunyikan form dan reset
  projectForm.reset();
  projectForm.classList.remove("show");
});

// submit new project form
projectForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Ambil nilai input
  const newProject = document.querySelector("#add-project-title").value;
  if (!newProject) {
    alert("Project name cannot be empty!");
    return;
  }

  // tambahkan dan render elemen li baru
  addNewProject(newProject);
  renderProjects(newProject);

  // Sembunyikan form dan reset
  projectForm.reset();
  projectForm.classList.remove("show");
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
