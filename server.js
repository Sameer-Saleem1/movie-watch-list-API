const express = require("express");
const cookieParser = require("cookie-parser");
const movieRoute = require("./routes/movieRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const watchListRoutes = require("./routes/watchListRoutes.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

app.use("/movies", movieRoute);
app.use("/auth", authRoutes);
app.use("/watchList", watchListRoutes);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
