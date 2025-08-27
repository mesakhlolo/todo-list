// render project list in the sidebar
function renderProjects(projects, activeProjectName) {
  const projectsList = document.querySelector(".project-list");
  projectsList.innerHTML = "";

  // Add "All Projects" option
  const allProjectsItem = document.createElement("li");
  allProjectsItem.classList.add("list-project");
  if (activeProjectName === "All") {
    allProjectsItem.classList.add("active");
  }
  allProjectsItem.textContent = "All Tasks";
  allProjectsItem.dataset.name = "All";
  projectsList.appendChild(allProjectsItem);

  projects.forEach(function (project) {
    const projectItem = document.createElement("li");

    projectItem.classList.add("list-project");
    if (project.name === activeProjectName) {
      projectItem.classList.add("active");
    }
    projectItem.textContent = project.name;
    projectItem.dataset.name = project.name;

    projectsList.appendChild(projectItem);
  });
}

// render todos
function renderTodos(project) {
  if (!project) {
    document.querySelector(
      ".task-list"
    ).innerHTML = `<li>Select a project to view its task</li>`;

    document.querySelector(".current-project-title").textContent =
      "No Project Selected";
    return;
  }

  document.querySelector(".current-project-title").textContent =
    project.name === "All" ? "All Tasks" : `${project.name} Project Task`;

  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  project.todos.forEach(function (todo) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const projectInfo =
      project.name === "All"
        ? `<p class="task-project-name">Project: ${todo.projectName}</p>`
        : "";

    taskItem.innerHTML = `
      <div class="task-main">
        <input type="checkbox" />
        <label>${todo.title}</label>
        <p>${todo.description}</p>
        <p>Due: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        ${projectInfo}
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
