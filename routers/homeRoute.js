const express = require("express");
const router = express.Router();
const {
  createHome,
  getAllHome,
  getHomeById,
  updateHomeById,
  deleteHomeById,
} = require("../controllers/homeCtrl");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const multer = require("multer");

// multer-code here
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 6);
    return cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
// multer code end

// create home
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["owner"]),
  upload.single("upload"),
  createHome
);
// get all home data
router.get(
  "/:owner_Id",
  authenticateToken,
  authorizeRoles(["owner"]),
  getAllHome
);
// get home by id
router.get(
  "/:owner_Id/:home_Id",
  authenticateToken,
  authorizeRoles(["owner", "renter"]),
  getHomeById
);
// update home by id
router.patch(
  "/:owner_Id/:home_Id",
  authenticateToken,
  authorizeRoles(["owner"]),
  updateHomeById
);
// delete home by id
router.delete(
  "/:owner_Id/:home_Id",
  authenticateToken,
  authorizeRoles(["owner"]),
  deleteHomeById
);

module.exports = router;
