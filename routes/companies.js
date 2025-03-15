const path = require("path");

const express = require("express");

const companyControllers = require("../controllers/companyControllers");

const auth = require("../middlewares/auth");

const router = express();

router.post("/addCompany", auth, companyControllers.addCompany);
router.get("/getCompanies", auth, companyControllers.getCompanies);

module.exports = router;
