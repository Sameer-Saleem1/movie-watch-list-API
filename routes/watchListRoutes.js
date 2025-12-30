const express = require("express");
const {
  addToWatchList,
  getWatchList,
  deleteWatchListItem,
} = require("../controller/watchListController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();
router.use(authMiddleware);

router.get("/", getWatchList);
router.post("/", addToWatchList);
router.delete("/:id", deleteWatchListItem);

module.exports = router;
