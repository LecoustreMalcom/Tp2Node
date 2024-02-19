const express = require("express");
const app = express();
const port = 3000;
const { connectTodB } = require("./services/db/connection");
const indexRouter = require("./routes/index");
const apiKey = "dfa57566";

app.use(express.json());

app.use((req, res, next) => {
  return next();
});

app.get("/", (req, res) => {
  res.send("Bienvenue");
});

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectTodB();
});
