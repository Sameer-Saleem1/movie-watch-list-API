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
