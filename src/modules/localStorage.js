import { getProjects } from "./projectManager";

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(getProjects()));
}

function loadProjects() {
  const data = localStorage.getItem("projects");
  try {
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error parsing data from localStorage: " + error);
    // clear corrupt data
    localStorage.removeItem("projects");
    return [];
  }
}

export { saveProjects, loadProjects };
