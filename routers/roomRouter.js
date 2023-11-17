const express = require('express');
const router = express.Router();
const {createRoom} = require('../controllers/roomCtrl');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require("../middlewares/authorizeRoles");

// create room
router.post('/:owner_Id/:home_Id', authenticateToken, authorizeRoles(['owner']), createRoom)

module.exports = router