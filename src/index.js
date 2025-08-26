import "./css/styles.css";

import { addNewProject, setProjects } from "./modules/projectManager.js";
import { addNewTodo, createTodo } from "./modules/todoManager.js";
import { renderProjects, renderTodos } from "./modules/domRenderer.js";
import { loadProjects, saveProjects } from "./modules/localStorage.js";

const addTaskForm = document.querySelector(".add-task-form");
const taskInput = addTaskForm.querySelector("#add-task-title");
const descriptionInput = document.querySelector("#add-task-description");
const dateInput = document.querySelector("#add-task-date");

const addProjectBtn = document.querySelector(".add-project-btn");
const projectForm = document.querySelector(".add-project-form");
const cancelProjectForm = document.querySelector(".cancel-project-form");

const addTaskBtn = document.querySelector(".add-task-btn");
const cancelTaskForm = document.querySelector(".cancel-task-form");

// default selected project
let selectedProject = "Default";

// load data dari localStorage
const dataFromStorage = loadProjects();
if (dataFromStorage && dataFromStorage.length > 0) {
  setProjects(dataFromStorage);
} else {
  addNewProject("Default");
  saveProjects();
}

// render awal saat aplikasi pertama kali dimuat
renderProjects();
renderTodos(selectedProject);

// flow ketika user add a new project
// show new project form
addProjectBtn.addEventListener("click", function () {
  // hide add new project button
  addProjectBtn.classList.add("hide");
  // tampilkan form
  projectForm.classList.add("show");
});
// cancel new project form
cancelProjectForm.addEventListener("click", function () {
  // tampilkan add new project button
  addProjectBtn.classList.remove("hide");
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

  // tambahkan project, simpan local, render
  addNewProject(newProject);
  saveProjects();
  renderProjects(newProject);

  // Sembunyikan form dan reset
  projectForm.reset();
  projectForm.classList.remove("show");

  // tampilkan add new project button
  addProjectBtn.classList.remove("hide");
});

// flow ketika user add new todos / task
addTaskBtn.addEventListener("click", function () {
  // hide add task button
  addTaskBtn.classList.add("hide");
  // tampilkan form
  addTaskForm.classList.add("show");
});
// cancel task fom
cancelTaskForm.addEventListener("click", function () {
  // tampilkan add new task button
  addTaskBtn.classList.remove("hide");

  // sembunyikan form dan reset
  addTaskForm.classList.remove("show");
  addTaskForm.reset();
});

// user add a new todo in form
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

  // tambahkan todo, simpan di local, dan render
  addNewTodo(selectedProject, todo);
  saveProjects();
  renderTodos(selectedProject);

  // tampilkan add new task button
  addTaskBtn.classList.remove("hide");

  // sembunyikan form dan reset
  addTaskForm.classList.remove("show");
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
