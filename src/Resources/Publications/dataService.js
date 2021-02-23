import { fetchWithOAuth } from "../../utils/oauth";

export const getAllPublications = async () => {
  const response = await fetchWithOAuth(
    "https://api.foleon.com/v2/magazine/edition",
    {
      method: "GET",
    }
  );

  const projectsJson = await response.json();
  return projectsJson._embedded.edition;
};

// export const getAllPublications = () =>
//   fetch("https://api.foleon.com/v2/magazine/edition", {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer b94a01bdf4ccbb1d1d7f6f9dbc1a24a49e562936",
//     },
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((res) => {
//       return res._embedded.edition;
//     });
