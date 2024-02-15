import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3050;

app.use(express.static("public"));

app.get("/", (req, res) => {
  const pathToHtmlFile = path.resolve("src/views/index.html");
  res.sendFile(pathToHtmlFile);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
