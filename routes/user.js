const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require("../controllers/user");

// routes
router.route("/api/users").post(createUser).get(getAllUsers);
router.route("/api/user/:_id").get(getUserById).patch(updateUserById).delete(deleteUserById)

module.exports = router;