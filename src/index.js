import "./css/styles.css";

import {
  addNewProject,
  getActiveProjectName,
  getProjectByName,
  getProjects,
  setActiveProjectName,
  setProjects,
} from "./modules/projectManager.js";
import { addNewTodo, createTodo } from "./modules/todoManager.js";
import { renderProjects, renderTodos } from "./modules/domRenderer.js";
import { loadProjects, saveProjects } from "./modules/localStorage.js";

// DOM Selections
const taskForm = document.querySelector(".add-task-form");
const taskInput = taskForm.querySelector("#add-task-title");
const descriptionInput = document.querySelector("#add-task-description");
const dateInput = document.querySelector("#add-task-date");

const addProjectBtn = document.querySelector(".add-project-btn");
const projectForm = document.querySelector(".add-project-form");
const cancelProjectForm = document.querySelector(".cancel-project-form");

const addTaskBtn = document.querySelector(".add-task-btn");
const cancelTaskForm = document.querySelector(".cancel-task-form");
const projectListContainer = document.querySelector(".project-list");

// UI Update Function
function updateUI() {
  const allProjects = getProjects();
  const activeProject = getProjectByName(getActiveProjectName());

  renderProjects(allProjects);
  renderTodos(activeProject);
  saveProjects(allProjects);
}

// Event Handlers
function handleProjectFormSubmit(event) {
  event.preventDefault();
  const newProjectName = document
    .querySelector("#add-project-title")
    .value.trim();

  if (!newProjectName) {
    alert("Project name can't be empty!");
    return;
  }

  const wasProjectAdded = addNewProject(newProjectName);

  // Only update UI if the project was actually added
  if (wasProjectAdded) {
    setActiveProjectName(newProjectName);
    updateUI();

    projectForm.reset();
    projectForm.classList.remove("show");
    addProjectBtn.classList.remove("hide");
  }
}

function handleTaskFormSubmit(event) {
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
  addNewTodo(getActiveProjectName(), todo);
  updateUI();

  taskForm.reset();
  taskForm.classList.remove("show");
  addTaskBtn.classList.remove("hide");
}

function handleProjectSelection(event) {
  if (event.target.classList.contains("list-project")) {
    const newActiveProjectName = event.target.dataset.name;
    setActiveProjectName(newActiveProjectName);
    updateUI();
  }
}

function initialize() {
  // Event Listener
  projectForm.addEventListener("submit", handleProjectFormSubmit);
  taskForm.addEventListener("submit", handleTaskFormSubmit);
  projectListContainer.addEventListener("click", handleProjectSelection);

  // UI toggles
  addProjectBtn.addEventListener("click", () => {
    addProjectBtn.classList.add("hide");
    projectForm.classList.add("show");
  });
  cancelProjectForm.addEventListener("click", () => {
    addProjectBtn.classList.remove("hide");
    projectForm.classList.remove("show");
    projectForm.reset();
  });
  addTaskBtn.addEventListener("click", () => {
    addTaskBtn.classList.add("hide");
    taskForm.classList.add("show");
  });
  cancelTaskForm.addEventListener("click", () => {
    addTaskBtn.classList.remove("hide");
    taskForm.classList.remove("show");
  });

  // load data and render for first time
  const dataFromStorage = loadProjects();
  if (dataFromStorage && dataFromStorage.length > 0) {
    setProjects(dataFromStorage);
  } else {
    addNewProject("Default");
    saveProjects();
  }
  updateUI();
}

// start up
initialize();
