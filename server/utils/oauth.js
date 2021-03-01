import FormData from "form-data";
import fetch from "node-fetch";

let token = null;
const getAccessToken = async () => {
  async function fetchAndParse() {
    const formData = new FormData();
    formData.append("grant_type", "client_credentials");
    formData.append("client_id", process.env.FOLEON_CLIENT_ID);
    formData.append("client_secret", process.env.FOLEON_CLIENT_SECRET);
    const init = { method: "POST", body: formData };
    const response = await fetch("https://api.foleon.com/oauth", init);
    const json = await response.json();
    return `${json.token_type} ${json.access_token}`;
  }

  if (token !== null) {
    return await token;
  }

  token = fetchAndParse();
  return await token;
};

export const repeat = async (functionToRepeat, ...args) => {
  try {
    return await functionToRepeat(...args);
  } catch {
    token = null;
    return await functionToRepeat(...args);
  }
};
export const getToken = () => getAccessToken();

export const fetchWithOAuth = async (resource, init) => {
  if (!init) {
    init = {};
  }
  if (!("headers" in init)) {
    init.headers = {};
  }
  init.headers = { Authorization: await getToken(), ...init.headers };
  try {
    return await fetch(resource, init);
  } catch {
    token = null;
    init.headers.Authorization = await getToken();
    return await fetch(resource, init);
  }
};
