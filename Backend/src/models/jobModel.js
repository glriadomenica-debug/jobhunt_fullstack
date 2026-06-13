const db = require("../config/db");

const getAllJobs = async () => {
  const [rows] = await db.query("SELECT * FROM jobs WHERE is_active = true");
  return rows;
};

const getJobById = async (id) => {
  const [rows] = await db.query("SELECT * FROM jobs WHERE id = ?", [id]);
  return rows[0];
};

//menampilkan lowongan milik Recruiter tertentu
const getJobsByRecruiter = async (recruiterId) => {
  const [rows] = await db.query("SELECT * FROM jobs WHERE recruiter_id = ?", [
    recruiterId,
  ]);
  return rows;
};

const createJob = async (data) => {
  const [result] = await db.query("INSERT INTO jobs SET ?", [data]);
  return result.insertId;
};

const updateJob = async (id, data) => {
  const [result] = await db.query("UPDATE jobs SET ? WHERE id = ?", [data, id]);
  return result;
};

const deleteJob = async (jobId, recruiterId) => {
  const [result] = await db.query(
    "DELETE FROM jobs WHERE id = ? AND recruiter_id = ?",
    [jobId, recruiterId],
  );
  return result;
};

const getDashboardStats = async (recruiterId) => {
  const [jobRows] = await db.query(
    "SELECT COUNT(*) AS total FROM jobs WHERE recruiter_id = ?",
    [recruiterId],
  );

  const [appRows] = await db.query(
    `
    SELECT COUNT(*) AS total
    FROM applications a
    JOIN jobs j ON j.id = a.job_id
    WHERE j.recruiter_id = ?
  `,
    [recruiterId],
  );

  return {
    totalJobs: jobRows[0].total,
    totalApplicants: appRows[0].total,
  };
};

module.exports = {
  getAllJobs,
  getJobById,
  getJobsByRecruiter,
  createJob,
  updateJob,
  deleteJob,
  getDashboardStats,
};
