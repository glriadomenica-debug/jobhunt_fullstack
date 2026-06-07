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
    const jobs = await jobModel.getMyJobs(req.user.id);

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
    await jobModel.deleteJob(req.params.id);

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

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
};
