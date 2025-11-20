const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");
import { Signup, Login, Profile } from "../Controllers/AuthController.js";

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "devsecret",
    { expiresIn: "7d" }
  );
}

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/me", auth(), Profile);

module.exports = router;
