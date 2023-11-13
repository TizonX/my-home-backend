const express = require("express");
const router = express.Router();

const { handleSignup, handleSignin, userInfo } = require('../controllers/auth');

// routes
router.route("/signup").post(handleSignup);
router.route("/login").post(handleSignin);

router.route("/userInfo/:_id").get(userInfo);

module.exports = router;