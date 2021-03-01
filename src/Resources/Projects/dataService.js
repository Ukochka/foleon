export const getAllProjects = async () => {
  const response = await fetch("http://localhost:3000/v2/magazine/title", {
    method: "GET",
  });
  const projectsJson = await response.json();
  return projectsJson._embedded.title;
};
