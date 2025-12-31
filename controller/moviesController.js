const { prisma } = require("../config/db");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie?.findMany();

    if (movies.length === 0) {
      return res.json({
        message: "no movie found",
      });
    }
    return res.status(200).json({
      data: {
        movies: movies,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const id = req.params.id;

    const movieWithID = await prisma.movie.findMany({
      where: {
        createdBy: id,
      },
    });

    if (movieWithID.length === 0) {
      return res.json({ error: "No movies found with this id" });
    }

    return res.status(200).json({
      status: "Success",
      data: movieWithID,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
