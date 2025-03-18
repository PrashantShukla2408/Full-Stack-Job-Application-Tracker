const path = require("path");

const express = require("express");

const jobControllers = require("../controllers/jobControllers");

const auth = require("../middlewares/auth");

const router = express();

router.post("/addJob", auth, jobControllers.addJob);
router.get("/getAllJobs", auth, jobControllers.getAllJobs);
router.put("/updateJob/:jobId", auth, jobControllers.updateJob);

module.exports = router;
