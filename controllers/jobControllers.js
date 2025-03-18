const path = require("path");
const AWS = require("aws-sdk");
const Application = require("../models/applicationModel");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

exports.addJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      applicationDate,
      status,
      salary,
      followUpDate,
      notes,
    } = req.body;
    const file = req.files.resume;

    let resumeURL = null;
    if (req.files && req.files.resume) {
      const file = req.files.resume;

      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${Date.now()}${path.extname(file.name)}`,
        Body: file.data,
        ACL: "public-read",
        ContentType: file.mimetype,
      };

      const s3Response = await s3.upload(params).promise();
      resumeURL = s3Response.Location;
    }
    const userId = req.userId;
    const application = await Application.create({
      jobTitle: jobTitle,
      companyName: companyName,
      location: location,
      applicationDate: applicationDate,
      status: status,
      salary: salary,
      followUpDate: followUpDate,
      notes: notes,
      resume: resumeURL,
      userId: userId,
    });
    res.status(201).json({
      message: "Job added successfully",
      application: application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllJobs = async (req, res) => {
  const userId = req.userId;

  try {
    const applications = await Application.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({
      jobs: applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateJob = async (req, res) => {
  const userId = req.userId;
  const jobId = req.params.jobId;

  const { status, followUpDate, notes } = req.body;
  try {
    const application = await Application.findOne({
      where: {
        id: jobId,
        userId: userId,
      },
    });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    application.status = status;
    application.followUpDate = followUpDate;
    application.notes = notes;

    await application.save();
    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
