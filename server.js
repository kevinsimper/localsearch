import express from "express";
import { appendFile } from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/search", (req, res) => {
  const query = req.query.q;
  console.log("Search", query);
  appendFile("./queries.csv", `${query},${Date.now()}\n`, "utf8", (err) => {
    if (err) console.log(err);
  });
  res.redirect("https://www.google.com/search?q=" + query);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listeningn on http://localhost:${PORT}`));
