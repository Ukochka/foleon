import { fetchWithOAuth } from "../../utils/oauth";

export const getAllProjects = async () => {
  const response = await fetchWithOAuth(
    "https://api.foleon.com/v2/magazine/title",
    {
      method: "GET",
    }
  );

  const projectsJson = await response.json();
  return projectsJson._embedded.title;
};
