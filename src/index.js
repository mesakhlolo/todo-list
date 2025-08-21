const addTaskForm = document.querySelector(".add-task-form");
const taskInput = addTaskForm.querySelector("#add-task-title");
const taskList = document.querySelector(".task-list");
const descriptionInput = document.querySelector("#add-task-description");
const dateInput = document.querySelector("#add-task-date");

// struktur array untuk projects
let projects = [
  {
    name: "Default",
    todos: [
      {
        title: "Todo Pertama di Default Project",
        description: "Some description for todo",
        dueDate: "2025-08-21",
        priority: "High",
      },
    ],
  },
  {
    name: "Learning",
    todos: [
      {
        title: "Todo Pertama di Learning Project",
        description: "Some description for todo",
        dueDate: "2025-08-25",
        priority: "Medium",
      },
    ],
  },
];

// Create New Project
function createProjects(name) {
  // check project name apa sudah ada
  if (
    projects.some(function (project) {
      return project.name === name;
    })
  ) {
    alert("A project with this name already exists!");
    return;
  }

  // menambahkan project baru
  projects.push({ name: name, todos: [] });
  renderProjects(name);
}

// renderProjects
function renderProjects() {
  const projectsList = document.querySelector(".project-list");
  projectsList.innerHTML = "";

  projects.forEach(function (project) {
    const projectItem = document.createElement("li");
    projectItem.classList.add("list-project");
    projectItem.textContent = project.name;
    projectItem.dataset = project.name;

    projectsList.appendChild(projectItem);
  });
}

// Add New Project
const addProjectBtn = document.querySelector(".add-project-btn");
addProjectBtn.addEventListener("click", function () {
  const projectName = prompt("Input name for a new project:");
  if (projectName === null) return;
  if (!projectName.trim()) {
    alert("Project name can not be empty!");
    return;
  }
  createProjects(projectName);
});

// Create New Todo
function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

// Add new todo
addTaskForm.addEventListener("submit", function (event) {
  // biar tidak reload
  event.preventDefault();

  // ambil data
  const title = taskInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dateInput.value;
  const priority = document.querySelector(
    "input[name='priority']:checked"
  )?.value;

  // cek input kosong
  if (!title || !priority) {
    alert("Task dan Priority harus diisi!");
    return;
  }

  // buat object todo
  const todo = createTodo(title, description, dueDate, priority);

  // pakai data
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

  // tambahkan taskItem <li> ke dalam taskList <ul>
  taskList.appendChild(taskItem);

  // reset form dan focus input
  addTaskForm.reset();
  taskInput.focus();
});

let selectedProject = "Default";
// render todos
function renderTodos(projectsName) {
  // cari project berdasarkan nama]
  const project = projects.find(function (proj) {
    return proj.name === projectsName;
  });

  // jika project tidak ditemukan
  if (!project) {
    alert("Project not found!");
    return;
  }

  // kosongkan list task
  taskList.innerHTML = "";

  // render todos berdasarkan project yg dipilih
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

// cek project apa yg diselect user
document
  .querySelector(".project-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("list-project")) {
      selectedProject = event.target.textContent;
      renderTodos(selectedProject);
    }
  });
