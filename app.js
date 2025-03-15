const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const rootDir = require("./util/path");

const sequelize = require("./util/database");

const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");

const User = require("./models/userModel");
const Company = require("./models/companyModel");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});

app.use("/users", userRoutes);
app.use("/company", companyRoutes);

User.hasMany(Company, { foreignKey: "userId", onDelete: "CASCADE" });
Company.belongsTo(User, { foreignKey: "userId" });

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
