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
import { renderProjects, renderTodos } from "./modules/domRenderer.js";
import { loadProjects, saveProjects } from "./modules/localStorage.js";
import {
  addNewTodo,
  createTodo,
  deleteTodo,
  setTodoCompleted,
  updateTodo,
} from "./modules/todoManager.js";

// DOM Selections
const taskForm = document.querySelector(".add-task-form");
const taskInput = taskForm.querySelector("#add-task-title");
const descriptionInput = taskForm.querySelector("#add-task-description");
const dateInput = taskForm.querySelector("#add-task-date");

const editTaskForm = document.querySelector(".edit-task-form");
const editTaskInput = editTaskForm.querySelector("#edit-task-title");
const editDescriptionInput = editTaskForm.querySelector(
  "#edit-task-description"
);
const editDateInput = editTaskForm.querySelector("#edit-task-date");
const cancelEditForm = document.querySelector(".cancel-edit-form");

const addProjectBtn = document.querySelector(".add-project-btn");
const projectForm = document.querySelector(".add-project-form");
const cancelProjectForm = document.querySelector(".cancel-project-form");

const addTaskBtn = document.querySelector(".add-task-btn");
const cancelTaskForm = document.querySelector(".cancel-task-form");
const projectListContainer = document.querySelector(".project-list");
const taskListContainer = document.querySelector(".task-list");

// Global variables for edit functionality
let currentEditingTask = null;

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
  const li = event.target.closest(".list-project");
  if (!li) return;
  const newActiveProjectName = li.dataset.name;
  setActiveProjectName(newActiveProjectName);
  updateUI();
}

function handleEditTask(projectName, todoIndex) {
  const project = getProjectByName(projectName);
  if (!project || !project.todos[todoIndex]) {
    alert("Task not found!");
    return;
  }

  const todo = project.todos[todoIndex];

  // Store current editing task info
  currentEditingTask = {
    projectName,
    todoIndex,
  };

  // Populate edit form with current values
  editTaskInput.value = todo.title || "";
  editDescriptionInput.value = todo.description || "";
  editDateInput.value = todo.dueDate || "";

  // Set priority radio button
  const priorityRadio = editTaskForm.querySelector(
    `input[name="edit-priority"][value="${todo.priority}"]`
  );
  if (priorityRadio) {
    priorityRadio.checked = true;
  }

  // Hide other forms and show edit form
  taskForm.classList.remove("show");
  addTaskBtn.classList.remove("hide");
  editTaskForm.classList.add("show");
}

function handleEditFormSubmit(event) {
  event.preventDefault();

  if (!currentEditingTask) {
    alert("No task selected for editing!");
    return;
  }

  const title = editTaskInput.value.trim();
  const description = editDescriptionInput.value.trim();
  const dueDate = editDateInput.value;
  const priority = editTaskForm.querySelector(
    "input[name='edit-priority']:checked"
  )?.value;

  if (!title || !priority) {
    alert("Title and Priority must be filled!");
    return;
  }

  const updateFields = {
    title,
    description,
    dueDate,
    priority,
  };

  const success = updateTodo(
    currentEditingTask.projectName,
    currentEditingTask.todoIndex,
    updateFields
  );

  if (success) {
    updateUI();

    // Reset form and hide it
    editTaskForm.reset();
    editTaskForm.classList.remove("show");
    currentEditingTask = null;
  } else {
    alert("Failed to update task!");
  }
}

function cancelEditTask() {
  editTaskForm.reset();
  editTaskForm.classList.remove("show");
  currentEditingTask = null;
}

function initialize() {
  // Event Listener
  projectForm.addEventListener("submit", handleProjectFormSubmit);
  taskForm.addEventListener("submit", handleTaskFormSubmit);
  editTaskForm.addEventListener("submit", handleEditFormSubmit);
  cancelEditForm.addEventListener("click", cancelEditTask);
  projectListContainer.addEventListener("click", handleProjectSelection);

  // Unified delegation for delete, complete, edit, and expand
  taskListContainer.addEventListener("click", function (event) {
    // Edit
    if (event.target.classList.contains("edit-btn")) {
      const taskItem = event.target.closest(".task-item");
      if (!taskItem) return;
      const projectName = taskItem.dataset.projectName;
      const index = parseInt(taskItem.dataset.todoIndex, 10);
      if (Number.isNaN(index)) return;
      handleEditTask(projectName, index);
      return;
    }

    // Delete
    if (event.target.classList.contains("delete-btn")) {
      const taskItem = event.target.closest(".task-item");
      if (!taskItem) return;
      const projectName = taskItem.dataset.projectName;
      const index = parseInt(taskItem.dataset.todoIndex, 10);
      if (Number.isNaN(index)) return;
      const confirmDelete = confirm("Delete this task?");
      if (!confirmDelete) return;
      const ok = deleteTodo(projectName, index);
      if (ok) updateUI();
      return;
    }

    // Complete toggle
    if (event.target.classList.contains("complete-checkbox")) {
      const checkbox = event.target;
      const taskItem = checkbox.closest(".task-item");
      if (!taskItem) return;
      const projectName = taskItem.dataset.projectName;
      const index = parseInt(taskItem.dataset.todoIndex, 10);
      if (Number.isNaN(index)) return;
      if (setTodoCompleted(projectName, index, checkbox.checked)) updateUI();
      event.stopPropagation();
      return;
    }

    // Expand/collapse when clicking summary row (ignore action buttons)
    if (event.target.closest(".edit-btn, .delete-btn")) return;
    const summaryEl = event.target.closest(".task-summary");
    if (summaryEl) {
      const details = summaryEl.nextElementSibling;
      const expanded = summaryEl.getAttribute("aria-expanded") === "true";
      summaryEl.setAttribute("aria-expanded", (!expanded).toString());
      if (details) details.hidden = expanded;
      return;
    }
  });

  // Keyboard accessibility for summary (Enter/Space)
  taskListContainer.addEventListener("keydown", function (event) {
    if (!event.target.classList.contains("task-summary")) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    const summaryEl = event.target;
    const details = summaryEl.nextElementSibling;
    const expanded = summaryEl.getAttribute("aria-expanded") === "true";
    summaryEl.setAttribute("aria-expanded", (!expanded).toString());
    if (details) details.hidden = expanded;
  });

  // Initialize flatpickr
  flatpickr("#add-task-date", {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  });

  flatpickr("#edit-task-date", {
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
