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
  }

  project.todos.push(todo);
}

export { createTodo, addNewTodo };
