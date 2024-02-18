const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  addItem,
  updateState,
  viewWatchlist,
} = require("../controllers/users");

router.post("/create", createUser);
router.get("/get", getUser);
router.post("/add_item", addItem);
router.put("/update_state", updateState);
router.get("/view_watchlist", viewWatchlist);

module.exports = router;
