const express = require("express");
const { getAllMovies } = require("../controller/moviesController.js");
const router = express.Router();

router.get("/", getAllMovies);

module.exports = router;
