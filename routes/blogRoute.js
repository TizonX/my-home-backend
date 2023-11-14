const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require("../controllers/blogCtrl");
const authorizeRoles = require('../middleware/authorizeRoles');
const authenticateToken = require('../middleware/authenticateToken');
// routes
router.post('/blog', authenticateToken, authorizeRoles(['user']), createUser);
router.get('/blog/:_id', authenticateToken, authorizeRoles(['user']), getUserById);
router.patch('/blog/:_id', authenticateToken, authorizeRoles(['user']), updateUserById);
router.delete('/blog/:_id', authenticateToken, authorizeRoles(['user']), deleteUserById);

router.get('/blogs', authenticateToken, authorizeRoles(['admin']), getAllUsers);
// router.route("/user/:_id").get(getUserById).patch(updateUserById).delete(deleteUserById)

module.exports = router;