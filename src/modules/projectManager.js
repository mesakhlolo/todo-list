// array structure for projects
let projects = [
  {
    name: "Learning",
    todos: [
      {
        title: "Build a To-Do App",
        description:
          "Use HTML, CSS, and JavaScript to build a functional to-do list application.",
        dueDate: "2025-8-30",
        priority: "High",
      },
    ],
  },
];
let activeProjectName = "All";

// get all projects array
function getProjects() {
  return projects;
}

// get active project name
function getActiveProjectName() {
  return activeProjectName;
}
// set active project name
function setActiveProjectName(name) {
  activeProjectName = name;
}

// get project by name
function getProjectByName(name) {
  if (name === "All") {
    const allTodos = projects.flatMap((project) =>
      project.todos.map((todo, index) => ({
        ...todo,
        projectName: project.name,
        indexInProject: index,
      }))
    );
    return { name: "All", todos: allTodos };
  }
  return projects.find(function (project) {
    return project.name === name;
  });
}

// create a new project and add it to the list
function addNewProject(name) {
  // check the project name to see if it already exists
  if (
    projects.some(function (project) {
      return project.name === name;
    })
  ) {
    alert("A project with this name already exist!");
    return false;
  }

  // add new project to array
  projects.push({ name: name, todos: [] });
  return true;
}

// set projects
function setProjects(newProjectsData) {
  // kosongkan array
  projects.length = 0;

  // isi dengan data baru
  newProjectsData.forEach(function (project) {
    projects.push(project);
  });
}

export {
  getProjects,
  getProjectByName,
  addNewProject,
  setProjects,
  getActiveProjectName,
  setActiveProjectName,
};
