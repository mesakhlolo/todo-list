import { getProjectByName } from "./projectManager";

// create a new todo using factory function
function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
}

// add new todo to project
function addNewTodo(projectName, todo) {
  const project = getProjectByName(projectName);
  if (!project) {
    console.error("Project not found!");
    return;
  }

  project.todos.push(todo);
}

// delete todo by index from a specific project
function deleteTodo(projectName, index) {
  const project = getProjectByName(projectName);
  if (!project) {
    console.error("Project not found!");
    return false;
  }
  if (index < 0 || index >= project.todos.length) {
    console.error("Invalid todo index!");
    return false;
  }
  project.todos.splice(index, 1);
  return true;
}

// update todo fields (title, description, dueDate, priority, completed?)
function updateTodo(projectName, index, fields) {
  const project = getProjectByName(projectName);
  if (!project) {
    console.error("Project not found!");
    return false;
  }
  if (index < 0 || index >= project.todos.length) {
    console.error("Invalid todo index!");
    return false;
  }
  const todo = project.todos[index];
  if (typeof fields.title === "string") todo.title = fields.title;
  if (typeof fields.description === "string") todo.description = fields.description;
  if (typeof fields.dueDate === "string") todo.dueDate = fields.dueDate;
  if (typeof fields.priority === "string") todo.priority = fields.priority;
  if (typeof fields.completed === "boolean") todo.completed = fields.completed; // optional
  return true;
}

// set completed state on a todo by project and index
function setTodoCompleted(projectName, index, completed) {
  const project = getProjectByName(projectName);
  if (!project) {
    console.error("Project not found!");
    return false;
  }
  if (index < 0 || index >= project.todos.length) {
    console.error("Invalid todo index!");
    return false;
  }
  project.todos[index].completed = Boolean(completed);
  return true;
}

export { createTodo, addNewTodo, deleteTodo, updateTodo, setTodoCompleted };
