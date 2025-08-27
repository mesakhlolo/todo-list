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
  const totalCount = projects.reduce(function (sum, p) {
    return sum + (Array.isArray(p.todos) ? p.todos.length : 0);
  }, 0);
  allProjectsItem.innerHTML = `
    <span class="project-title">All Tasks</span>
    <span class="project-badge">${totalCount}</span>
  `;
  allProjectsItem.dataset.name = "All";
  projectsList.appendChild(allProjectsItem);

  projects.forEach(function (project) {
    const projectItem = document.createElement("li");

    projectItem.classList.add("list-project");
    if (project.name === activeProjectName) {
      projectItem.classList.add("active");
    }
    const count = Array.isArray(project.todos) ? project.todos.length : 0;
    projectItem.innerHTML = `
      <span class="project-title">${project.name}</span>
      <span class="project-badge">${count}</span>
    `;
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

  project.todos.forEach(function (todo, idx) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    // dataset to help identify deletion target
    taskItem.dataset.projectName =
      project.name === "All" ? todo.projectName : project.name;
    taskItem.dataset.todoIndex =
      project.name === "All" ? todo.indexInProject : idx.toString();

    // priority class helpers
    const prio = (todo.priority || "").toLowerCase();
    if (prio === "high") taskItem.classList.add("priority-high");
    else if (prio === "medium") taskItem.classList.add("priority-medium");
    else if (prio === "low") taskItem.classList.add("priority-low");

    const dueText =
      todo.dueDate && String(todo.dueDate).trim() !== ""
        ? `Due: ${todo.dueDate}`
        : "No due date";

    const projectInfo =
      project.name === "All"
        ? `<p class="task-project-name">Project: ${todo.projectName}</p>`
        : "";

    taskItem.innerHTML = `
      <div class="task-summary" role="button" tabindex="0" aria-expanded="false">
        <span class="task-left">
          <input type="checkbox" class="complete-checkbox" ${
            todo.completed ? "checked" : ""
          } aria-label="Mark completed"/>
          <span class="task-title ${todo.completed ? "completed" : ""}">${
      todo.title
    }</span>
        </span>
        <span class="task-right">
          <span class="task-due ${
            prio ? `priority-${prio}` : ""
          }">${dueText}</span>
          <span class="task-actions-inline">
            <button type="button" class="edit-btn" title="Edit">Edit</button>
            <button type="button" class="delete-btn" title="Delete">Delete</button>
          </span>
        </span>
      </div>
      <div class="task-details" hidden>
        ${
          todo.description ? `<p class="task-desc">${todo.description}</p>` : ""
        }
        <p class="task-priority"><strong>Priority:</strong> ${
          todo.priority || "-"
        }</p>
        ${projectInfo}
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

export { renderProjects, renderTodos };
