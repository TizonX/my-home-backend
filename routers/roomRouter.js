const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms, getRoomById, updateRoomById, deleteRoomById } = require('../controllers/roomCtrl');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require("../middlewares/authorizeRoles");
const multer = require("multer");

// multer-code here
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/roomImages");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 6);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});
const upload_ = multer({ storage: storage });
// multer code end


// create room
router.post('/:home_Id', authenticateToken, authorizeRoles(['owner']),
    upload_.fields([{ name: "image" }, { name: "multiImage", maxCount: 5 }]),
    createRoom)
// get all rooms
router.get("/:owner_Id/:home_Id", authenticateToken, authorizeRoles(['owner']), getAllRooms);
// get room by id
router.get("/:room_Id", authenticateToken, authorizeRoles(['owner', 'renter']), getRoomById);
// update room by id
router.patch("/:room_Id", authenticateToken, authorizeRoles(['owner']), updateRoomById);
// delete room by id
router.delete("/:room_Id", authenticateToken, authorizeRoles(['owner']), deleteRoomById);


module.exports = router