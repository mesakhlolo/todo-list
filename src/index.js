const addTaskForm = document.querySelector(".add-task-form");
const taskInput = addTaskForm.querySelector("#add-task-title");
const taskList = document.querySelector(".task-list");
const descriptionInput = document.querySelector("#add-task-description");
const dateInput = document.querySelector("#add-task-date");

function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

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
