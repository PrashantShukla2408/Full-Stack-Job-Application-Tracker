const path = require("path");

const Company = require("../models/companyModel");

exports.addCompany = async (req, res) => {
  const userId = req.userId;
  const { name, location, industry, website, type, size, notes } = req.body;
  try {
    const company = await Company.create({
      name: name,
      location: location,
      industry: industry,
      website: website,
      type: type,
      size: size,
      notes: notes,
      userId: userId,
    });
    res.status(201).json({
      message: "Company added successfully",
      company: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCompanies = async (req, res) => {
  const userId = req.userId;
  try {
    const companies = await Company.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({
      companies: companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
