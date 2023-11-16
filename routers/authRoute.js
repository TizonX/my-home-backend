const express = require('express');
const router = express.Router();
const { handleSignIn, handleSignUp, handleSignInRenter, handleSignUpRenter } = require('../controllers/authCtrl');


// sign-up owner
router.post("/signup/owner", handleSignUp);
// sign-up renter
router.post("/signup/renter", handleSignUpRenter);
// sign-in owner
router.post("/signin/owner", handleSignIn);
// sign-in renter
router.post("/signin/renter", handleSignInRenter);


module.exports = router;