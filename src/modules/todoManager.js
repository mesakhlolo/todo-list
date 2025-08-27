import { getProjectByName } from "./projectManager";

// create a new todo using factory function
function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
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

export { createTodo, addNewTodo, deleteTodo };
