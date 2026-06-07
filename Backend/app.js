require("dotenv").config();

const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
const db = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW()");

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
