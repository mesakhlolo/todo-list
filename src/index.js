import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./css/styles.css";

import {
  addNewProject,
  getActiveProjectName,
  getProjectByName,
  getProjects,
  setActiveProjectName,
  setProjects,
} from "./modules/projectManager.js";
import { addNewTodo, createTodo, deleteTodo } from "./modules/todoManager.js";
import { renderProjects, renderTodos } from "./modules/domRenderer.js";
import { loadProjects, saveProjects } from "./modules/localStorage.js";

// DOM Selections
const taskForm = document.querySelector(".add-task-form");
const taskInput = taskForm.querySelector("#add-task-title");
const descriptionInput = taskForm.querySelector("#add-task-description");
const dateInput = taskForm.querySelector("#add-task-date");

const addProjectBtn = document.querySelector(".add-project-btn");
const projectForm = document.querySelector(".add-project-form");
const cancelProjectForm = document.querySelector(".cancel-project-form");

const addTaskBtn = document.querySelector(".add-task-btn");
const cancelTaskForm = document.querySelector(".cancel-task-form");
const projectListContainer = document.querySelector(".project-list");
const taskListContainer = document.querySelector(".task-list");

// UI Update Function
function updateUI() {
  const allProjects = getProjects();
  const activeProjectName = getActiveProjectName();
  const activeProject = getProjectByName(activeProjectName);

  renderProjects(allProjects, activeProjectName);
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

  let projectName = getActiveProjectName();
  if (projectName === "All") {
    const projectSelect = document.querySelector("#select-project");
    projectName = projectSelect.value;
    if (!projectName) {
      alert("Please select a project to add the new task to.");
      return;
    }
  }

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
  addNewTodo(projectName, todo);
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

  // delete button delegation
  taskListContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      const taskItem = event.target.closest(".task-item");
      if (!taskItem) return;
      const projectName = taskItem.dataset.projectName;
      const index = parseInt(taskItem.dataset.todoIndex, 10);
      if (Number.isNaN(index)) return;
      const confirmDelete = confirm("Delete this task?");
      if (!confirmDelete) return;
      const ok = deleteTodo(projectName, index);
      if (ok) {
        updateUI();
      }
    }
  });

  // Initialize flatpickr
  flatpickr("#add-task-date", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  });

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

    const projectSelectGroup = document.querySelector(
      ".project-selection-group"
    );
    const projectSelect = document.querySelector("#select-project");

    if (getActiveProjectName() === "All") {
      projectSelectGroup.style.display = "block";
      projectSelect.innerHTML = ""; // Clear previous options
      const projects = getProjects();
      if (projects.length === 0) {
        alert(
          "There are no projects to add tasks to. Please create a project first."
        );
        addTaskBtn.classList.remove("hide");
        taskForm.classList.remove("show");
        projectSelectGroup.style.display = "none";
        return;
      }
      projects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.name;
        option.textContent = project.name;
        projectSelect.appendChild(option);
      });
    } else {
      projectSelectGroup.style.display = "none";
    }
  });
  cancelTaskForm.addEventListener("click", () => {
    addTaskBtn.classList.remove("hide");
    taskForm.classList.remove("show");
    document.querySelector(".project-selection-group").style.display = "none";
  });

  // load data and render for first time
  const dataFromStorage = loadProjects();
  if (dataFromStorage && dataFromStorage.length > 0) {
    setProjects(dataFromStorage);
  } else {
    // ensure we persist initial state if none exists yet
    saveProjects(getProjects());
  }
  setActiveProjectName("All");
  updateUI();
}

// start up
initialize();
