const db = require("../config/db");

const getAllJobs = async () => {
  const [rows] = await db.pool.query(
    "SELECT * FROM jobs WHERE is_active = true",
  );

  return rows;
};

const getJobById = async (id) => {
  const [rows] = await db.pool.query("SELECT * FROM jobs WHERE id = ?", [id]);

  return rows[0];
};

const getMyJobs = async (recruiterId) => {
  const [rows] = await db.pool.query(
    "SELECT * FROM jobs WHERE recruiter_id = ?",
    [recruiterId],
  );

  return rows;
};

const createJob = async (data) => {
  const [result] = await db.pool.query(`INSERT INTO jobs SET ?`, [data]);

  return result.insertId;
};

const updateJob = async (id, data) => {
  const [result] = await db.pool.query("UPDATE jobs SET ? WHERE id=?", [
    data,
    id,
  ]);

  return result;
};

const deleteJob = async (id) => {
  const [result] = await db.pool.query("DELETE FROM jobs WHERE id=?", [id]);

  return result;
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
};
