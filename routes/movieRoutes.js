const express = require("express");
const {
  getAllMovies,
  getMovieById,
} = require("../controller/moviesController.js");
const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);

module.exports = router;
