const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms, getRoomById,updateRoomById } = require('../controllers/roomCtrl');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require("../middlewares/authorizeRoles");

// create room
router.post('/:owner_Id/:home_Id', authenticateToken, authorizeRoles(['owner']), createRoom)
// get all rooms
router.get("/:owner_Id/:home_Id", authenticateToken, authorizeRoles(['owner']), getAllRooms);
// get room by id
router.get("/:room_Id", authenticateToken, authorizeRoles(['owner', 'renter']), getRoomById);
// update room by id
router.patch("/:room_Id", authenticateToken, authorizeRoles(['owner']), updateRoomById);
module.exports = router