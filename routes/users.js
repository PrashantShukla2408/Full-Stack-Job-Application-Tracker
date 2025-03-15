const path = require("path");

const express = require("express");

const userControllers = require("../controllers/userControllers");

const auth = require("../middlewares/auth");

const router = express();

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.put("/profile", auth, userControllers.profile);
router.get("/getUserDetails", auth, userControllers.getUserDetails);

module.exports = router;
