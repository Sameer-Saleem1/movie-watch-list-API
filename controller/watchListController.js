const { prisma } = require("../config/db.js");

exports.addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  const movieExists = await prisma.movie.findUnique({ where: { id: movieId } });
  if (!movieExists) {
    return res.status(404).json({ error: "Movie not found" });
  }

  //check if already exists

  const existsingInWatchList = await prisma.watchListItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });
  if (existsingInWatchList) {
    return res.status(409).json({ error: "Movie already in the watchlist" });
  }

  const watchListItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      rating,
      status,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchListItem,
    },
  });
};

exports.getWatchList = async (req, res) => {
  try {
    const watchList = await prisma.watchListItem.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        status: true,
        rating: true,
        movie: {
          select: {
            title: true,
          },
        },
      },
    });
    return res.json({
      data: watchList,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteWatchListItem = async (req, res) => {
  try {
    const watchListItem = await prisma.watchListItem.delete({
      where: { id: req.params.id, userId: req.user.id },
    });
    res.status(200).json({
      status: "Success",
      message: "Movie Deleted from the watchlist ",
      data: {
        movieId: watchListItem.movieId,
      },
    });
  } catch (err) {
    res.json({
      error: "Can not remove the movie from watchlist",
    });
  }
};
