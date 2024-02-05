const express = require("express");
const router = express.Router();
const { createItem } = require("../controllers/item");

router.post("/create", createItem);

module.exports = router;
