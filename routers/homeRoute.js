const express = require('express');
const router = express.Router();
const { createHome, getHomeById } = require('../controllers/homeCtrl');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require("../middlewares/authorizeRoles");


// create home
router.post("/", authenticateToken, authorizeRoles(['owner']), createHome);
router.get("/:_id", authenticateToken, authorizeRoles(['owner','renter']), getHomeById);

module.exports = router;