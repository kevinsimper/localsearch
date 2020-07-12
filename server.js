import express from "express";
import { appendFile } from "fs";

const app = express();

app.get("/search", (req, res) => {
  const query = req.query.q;
  console.log("Search", query);
  appendFile("./queries.csv", `${query},${Date.now()}\n`, "utf8", (err) => {
    if (err) console.log(err);
  });
  res.redirect("https://www.google.com/search?q=" + query);
});

app.listen(8000, () => console.log("Listeningn on http://localhost:8000"));
