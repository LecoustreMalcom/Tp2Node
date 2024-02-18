const express = require("express");
const router = express.Router();
const { createItem, viewItems } = require("../controllers/item");

router.post("/create", createItem);
router.post("/view", viewItems)

module.exports = router;
