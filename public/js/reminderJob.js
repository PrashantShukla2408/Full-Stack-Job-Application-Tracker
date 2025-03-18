const cron = require("node-cron");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const { Op } = require("sequelize");

const User = require("../../models/userModel");
const Application = require("../../models/applicationModel");

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendReminderEmails(user, job) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = "Follow-Up Reminder";
  sendSmtpEmail.htmlContent = `<html><body><p>Hi ${user.name}, </p><p>This is a reminder to follow up on your job application for ${job.jobTitle} at ${job.companyName}.</p><p>Regards, Job Tracker Team</p></body></html>`;
  sendSmtpEmail.sender = {
    name: "Job Tracker Team",
    email: "prashantshukla1999@gmail.com",
  };
  sendSmtpEmail.to = [{ email: user.email, name: user.name }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
  }
}

cron.schedule("* 8 * * *", async () => {
  console.log("Running cron job to send reminders");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const jobs = await Application.findAll({
      where: {
        followUpDate: {
          [Op.between]: [today, tomorrow],
        },
      },
      include: [User],
    });

    for (const job of jobs) {
      const user = job.User;
      await sendReminderEmails(user, job);
    }
  } catch (error) {
    console.error(error);
  }
});
