const express = require("express");
const {
  register,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/Auth");

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
