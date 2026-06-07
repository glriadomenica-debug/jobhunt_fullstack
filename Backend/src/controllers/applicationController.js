const applicationModel = require("../models/applicationModel");

const applyJob = async (req, res) => {
  try {
    const applicationId = await applicationModel.applyJob({
      job_id: req.params.id,
      applicant_id: req.user.id,
      cover_letter: req.body.cover_letter,
    });

    res.status(201).json({
      success: true,
      applicationId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const data = await applicationModel.getMyApplications(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApplicants = async (req, res) => {
  try {
    const data = await applicationModel.getApplicants(req.params.id);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    await applicationModel.updateStatus(req.params.id, req.body.status);

    res.json({
      success: true,
      message: "Application updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getApplicants,
  updateStatus,
};
