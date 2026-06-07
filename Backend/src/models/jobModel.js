const db = require("../config/db");

const getAllJobs = async () => {
  const [rows] = await db.query("SELECT * FROM jobs WHERE is_active = true");

  return rows;
};

const getJobById = async (id) => {
  const [rows] = await db.query("SELECT * FROM jobs WHERE id = ?", [id]);

  return rows[0];
};

const getJobsByRecruiter = async (recruiterId) => {
  const [rows] = await db.query("SELECT * FROM jobs WHERE recruiter_id = ?", [
    recruiterId,
  ]);

  return rows;
};

const createJob = async (data) => {
  const [result] = await db.query(`INSERT INTO jobs SET ?`, [data]);

  return result.insertId;
};

const updateJob = async (id, data) => {
  const [result] = await db.query("UPDATE jobs SET ? WHERE id=?", [data, id]);

  return result;
};

const deleteJob = async (jobId, recruiterId) => {
  const [result] = await db.query(
    "DELETE FROM jobs WHERE id = ? AND recruiter_id = ?",
    [jobId, recruiterId],
  );

  return result;
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobsByRecruiter,
};
