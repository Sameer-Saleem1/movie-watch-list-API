const express = require("express");
const cookieParser = require("cookie-parser");
const movieRoute = require("./routes/movieRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const watchListRoutes = require("./routes/watchListRoutes.js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const allowedOrigins = [
  "http://localhost:5500", // For local testing
  "https://movie-watch-list-api.vercel.app/", // Your deployed Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Required for cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
