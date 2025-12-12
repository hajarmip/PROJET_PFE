const express = require("express");
const router = express.Router();

const {
  sendCode,
  verifyCode,
  registerUser
} = require("../controllers/authController");

// Routes
router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);
router.post("/register", registerUser);

module.exports = router;
