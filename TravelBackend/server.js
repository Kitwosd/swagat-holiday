const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const { connectDB, sequelize } = require("./config/db");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const seedDatabase = require("./scripts/seed");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*", // Allows requests from frontend vite dev server
    credentials: true,
  }),
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api", routes);

// Base route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Travels & Holidays API Server",
    version: "1.0.0",
    documentation: "/api/health",
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    console.log("Database synchronized.");

    // Auto-seed if database was fresh
    try {
      await seedDatabase();
    } catch (seedErr) {
      console.warn("Seeding note:", seedErr.message);
    }

    app.listen(PORT, () => {
      console.log(`===============================================`);

      console.log(`http://localhost:${PORT}/api`);
      console.log(`===============================================`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
