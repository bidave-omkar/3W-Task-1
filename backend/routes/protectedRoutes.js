// backend\routes\protectedRoutes.js
const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.user,
  });
});

module.exports = router;
