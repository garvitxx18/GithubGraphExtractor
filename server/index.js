const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 5000;
const routes = require("./routes");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", routes);

app.listen(port, () => console.log("listening on port 5000"));
