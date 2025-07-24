const express = require("express");
const { saveMood, getMoods } = require("../controllers/moodController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, saveMood);
router.get("/", auth, getMoods);

module.exports = router;
