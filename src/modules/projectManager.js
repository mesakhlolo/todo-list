// array structure for projects
const projects = [];
let activeProjectName = "Default";

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
