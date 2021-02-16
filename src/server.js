import express from "express";
import { appendFile, readFile } from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  readFile(__dirname + "/queries.csv", "utf8", (err, data) => {
    const rows = data.split("\n");
    const total = rows.length;
    const sevendays = 60 * 1000 * 60 * 24 * 7;
    const sevendaysago = Date.now() - sevendays;
    const lastsevendays = rows.reduce((acc, cur) => {
      const row = cur.split(",");
      const searchdayTimestamp = parseInt(row[1]);
      const searchday = new Date(searchdayTimestamp);
      if (isNaN(searchdayTimestamp)) {
        return acc;
      }
      return searchday > sevendaysago ? acc + 1 : acc;
    }, 0);

    res.json({
      queries: {
        total,
        lastsevendays,
      },
    });
  });
});

app.get("/search", (req, res) => {
  const query = req.query.q;
  console.log("Search", query);
  appendFile(
    __dirname + "/queries.csv",
    `${query},${Date.now()}\n`,
    "utf8",
    (err) => {
      if (err) console.log(err);
    }
  );
  res.redirect("https://www.google.com/search?q=" + encodeURIComponent(query));
});

app.get("/track", (req, res) => {
  const query = req.query.q;
  console.log("Click", query);
  appendFile(
    __dirname + "/clicks.csv",
    `${query},${Date.now()}\n`,
    "utf8",
    (err) => {
      if (err) console.log(err);
    }
  );
  res.send("ok");
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listeningn on http://localhost:${PORT}`));
