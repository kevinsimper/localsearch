import express from "express";
import { appendFile } from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());

app.get("/search", (req, res) => {
  const query = req.query.q;
  console.log("Search", query);
  appendFile("./queries.csv", `${query},${Date.now()}\n`, "utf8", (err) => {
    if (err) console.log(err);
  });
  res.redirect("https://www.google.com/search?q=" + query);
});

app.get("/suggest", async (req, res) => {
  const query = req.query.q;
  console.log("Suggest", query);

  const request = await fetch(
    `https://www.startpage.com/do/suggest?limit=10&lang=english&format=json&query=${query}&timestamp=${new Date().getTime()}&ixrc=38;BuOO;CDdotC.k:.16Ewb7X3P1jizwXHnJ139j`
  );
  const data = await request.json();

  res.send({ data: data[1] });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Listeningn on http://localhost:${PORT}`));
