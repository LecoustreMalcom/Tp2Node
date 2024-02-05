const express = require("express");
const router = express.Router();
const users = require("./users");
const item = require("./item");

router.use("/user", users);
router.use("/item", item);

module.exports = router;
