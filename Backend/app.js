require("dotenv").config();

const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
const db = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const applicationRoutes = require("./src/routes/applicationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// test db
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 as test");
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("DB ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
