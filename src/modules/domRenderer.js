import { getProjectByName, getProjects } from "./projectManager";

// render project list in the sidebar
function renderProjects() {
  const projectsList = document.querySelector(".project-list");
  projectsList.innerHTML = "";

  getProjects().forEach(function (project) {
    const projectItem = document.createElement("li");

    projectItem.classList.add("list-project");
    projectItem.textContent = project.name;
    projectItem.dataset.name = project.name;

    projectsList.appendChild(projectItem);
  });
}

// render todos
function renderTodos(projectName) {
  const project = getProjectByName(projectName);
  if (!project) {
    alert("Project not found!");
    return;
  }

  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  project.todos.forEach(function (todo) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
      <div class="task-main">
        <input type="checkbox" />
        <label>${todo.title}</label>
        <p>${todo.description}</p>
        <p>Due: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
      </div>
      <div class="task-actions">
        <button type="button" class="edit-btn">Edit</button>
        <button type="button" class="delete-btn">Delete</button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

export { renderProjects, renderTodos };
