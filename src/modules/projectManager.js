import { renderProjects } from "./domRenderer";

// array structure for projects
const projects = [
  {
    name: "Default",
    todos: [
      {
        title: "Todo Pertama di Default Project",
        description: "Some description for todo",
        dueDate: "2025-08-28",
        priority: "High",
      },
    ],
  },
  {
    name: "Chores",
    todos: [
      {
        title: "Todo Pertama di Chores Project",
        description: "Some description for todo",
        dueDate: "2025-08-27",
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
        dueDate: "2025-08-29",
        priority: "Medium",
      },
      {
        title: "Todo Kedua di Learning Project",
        description: "Some description for todo",
        dueDate: "2025-08-30",
        priority: "Low",
      },
    ],
  },
];

// get all projects array
function getProjects() {
  return projects;
}

// get project by name
function getProjectByName(name) {
  return projects.find(function (project) {
    return project.name === name;
  });
}

// create a new project
function createProjects(name) {
  // check the project name to see if it already exists
  if (
    projects.some(function (project) {
      return project.name === name;
    })
  ) {
    alert("A project with this name already exist!");
    return;
  }

  // add new project to array
  projects.push({ name: name, todos: [] });
}

// add new project
function addNewProject(projectName) {
  if (!projectName.trim()) {
    alert("Project name can not be empty!");
    return;
  }

  createProjects(projectName);
  renderProjects();
}

export { getProjects, getProjectByName, addNewProject };
