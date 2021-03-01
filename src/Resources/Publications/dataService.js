import qs from "qs";

export const getPublications = async (page, limit) => {
  const response = await fetch(
    `http://localhost:3000/v2/magazine/edition?page=${page}&limit=${limit}`,
    {
      method: "GET",
    }
  );
  const projectsJson = await response.json();
  return projectsJson._embedded.edition;
};

export const getPublicationPerProject = async (projectId, perpage = 20) => {
  const url = `http://localhost:3000/v2/magazine/edition?page=1&limit=${perpage}`;
  const filter =
    "&" +
    qs.stringify({
      filter: [
        {
          field: "title",
          type: "eq",
          value: projectId,
        },
      ],
    });
  const response = await fetch(`${url}${projectId === null ? "" : filter}`, {
    method: "GET",
  });
  const projectsJson = await response.json();
  return projectsJson._embedded.edition;
};
