// render project list in the sidebar
function renderProjects(projects) {
  const projectsList = document.querySelector(".project-list");
  projectsList.innerHTML = "";

  projects.forEach(function (project) {
    const projectItem = document.createElement("li");

    projectItem.classList.add("list-project");
    projectItem.textContent = project.name;
    projectItem.dataset.name = project.name;

    projectsList.appendChild(projectItem);
  });
}

// render todos
function renderTodos(projectName) {
  if (!projectName) {
    document.querySelector(
      ".task-list"
    ).innerHTML = `<li>Select a project to view its task</li>`;
    document.querySelector(
      ".current-project-title"
    ).textContent = `Unknown ${projectName.name}`;
  }

  document.querySelector(
    ".current-project-title"
  ).textContent = `${projectName.name} Project Task`;

  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  projectName.todos.forEach(function (todo) {
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
