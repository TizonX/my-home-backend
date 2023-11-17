const express = require('express');
const router = express.Router();
const { createHome, getAllHome, getHomeById, updateHomeById, deleteHomeById } = require('../controllers/homeCtrl');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require("../middlewares/authorizeRoles");


// create home
router.post("/", authenticateToken, authorizeRoles(['owner']), createHome);
// get all home data
router.get("/:owner_Id", authenticateToken, authorizeRoles(['owner']), getAllHome);
// get home by id
router.get("/:owner_Id/:home_Id", authenticateToken, authorizeRoles(['owner', 'renter']), getHomeById);
// update home by id
router.patch("/:owner_Id/:home_Id", authenticateToken, authorizeRoles(['owner']), updateHomeById);
// delete home by id
router.delete("/:owner_Id/:home_Id", authenticateToken, authorizeRoles(['owner']), deleteHomeById);


module.exports = router;