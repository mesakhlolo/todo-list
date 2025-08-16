const addTaskForm = document.querySelector(".add-task-form");
const taskInput = addTaskForm.querySelector("#add-task-input");
const taskList = document.querySelector(".task-list");

addTaskForm.addEventListener("submit", function (event) {
  // biar tidak reload
  event.preventDefault();

  // bersihkan input
  const task = taskInput.value.trim();
  if (!task) return;

  // pakai data
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
    <div class="task-main">
        <input type="checkbox" id="task1" label="task1" />
        <label for="task1">${task}</label>
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
