import express from "express";
import path from "path";

import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { proxyRequest } from "./controllers/proxy.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/pages", (err, res) => {
  res.status(200);
  res.json({ working: true });
  res.end();
});

let wrap = (fn) => (...args) => fn(...args).catch(args[2]);

app.get("/v2/*", wrap(proxyRequest));

app.listen(3000, () => {
  console.log("server is runnig on port 3000");
  console.log("Open your browser and hit url 'localhost:3000'");
});
