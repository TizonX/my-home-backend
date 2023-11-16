const express = require('express');
const router = express.Router();
const { handleSignIn, handleSignUp } = require('../controllers/authCtrl');


// sign-up
router.post("/signup/owner", handleSignUp);
// sign-in
router.post("/signin/owner", handleSignIn);

module.exports = router;