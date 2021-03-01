import LRU from "lru-cache";
import Bottleneck from "bottleneck";
import { fetchWithOAuth } from "../utils/oauth.js";

const BASE_URL = "https://api.foleon.com";
const cache = new LRU(1000); // sets just the max size
const limiter = new Bottleneck({
  minTime: (60 * 60 * 1000) / 1000, // 1000 requests per hour
});
export const proxyRequest = async (req, res) => {
  const url = `${BASE_URL}${req.originalUrl}`;
  if (req.method === "GET" && cache.get(url)) {
    res.status(200).json(cache.get(url));
  } else {
    const response = await limiter.schedule(() =>
      fetchWithOAuth(url, {
        method: req.method,
      })
    );
    // https://www.iana.org/assignments/media-types/media-types.xhtml
    if (!response.headers.get("Content-Type").endsWith("json")) {
      throw new Error("Unexpected format of the response");
    }
    const responseJson = await response.json();
    if (req.method === "GET") {
      cache.set(url, responseJson);
    }
    res.status(response.status).json(responseJson);
    res.end();
  }
};
