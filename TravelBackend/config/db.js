const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// 🔍 DEBUGGING
console.log("DB Config loaded from .env:");
console.log("DB_USER:", process.env.DB_USER);
console.log(
  "DB_PASSWORD:",
  process.env.DB_PASSWORD
    ? "*** (Password is set)"
    : "❌ (Password is EMPTY or undefined)",
);
console.log("DB_NAME:", process.env.DB_NAME);

const sequelize = new Sequelize(
  "Travels", // Hardcoded DB Name
  "root", // Hardcoded User
  "root", // 🚨 CHANGED TO "root" (Your new password)
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
    },
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database connected successfully via Sequelize.");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL database:", error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
};