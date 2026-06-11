const jobModel = require("../models/jobModel");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getAllJobs();

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await jobModel.getJobById(req.params.id);

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getJobsByRecruiter(req.user.id);

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createJob = async (req, res) => {
  try {
    const jobId = await jobModel.createJob({
      ...req.body,
      recruiter_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      jobId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    await jobModel.updateJob(req.params.id, req.body);

    res.json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const result = await jobModel.deleteJob(req.params.id, req.user.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found or not yours",
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const totalJobs = await db.query(
      "SELECT COUNT(*) AS total FROM jobs WHERE recruiter_id = ?",
      [recruiterId],
    );

    const totalApplicants = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM applications a
      JOIN jobs j ON j.id = a.job_id
      WHERE j.recruiter_id = ?
    `,
      [recruiterId],
    );

    res.json({
      data: {
        totalJobs: totalJobs[0][0].total,
        totalApplicants: totalApplicants[0][0].total,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  getDashboardStats,
};
