const path = require("path");
require("dotenv").config();
require("./public/js/reminderJob");

const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");

const rootDir = require("./util/path");

const sequelize = require("./util/database");

const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");
const jobRoutes = require("./routes/jobs");

const User = require("./models/userModel");
const Company = require("./models/companyModel");
const Application = require("./models/applicationModel");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});

app.use("/users", userRoutes);
app.use("/company", companyRoutes);
app.use("/jobs", jobRoutes);

User.hasMany(Company, { foreignKey: "userId", onDelete: "CASCADE" });
Company.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Application, { foreignKey: "userId", onDelete: "CASCADE" });
Application.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
