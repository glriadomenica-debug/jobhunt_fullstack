const db = require("../config/db");

const applyJob = async (data) => {
  const [result] = await db.pool.query("INSERT INTO applications SET ?", [
    data,
  ]);

  return result.insertId;
};

const getMyApplications = async (userId) => {
  const [rows] = await db.pool.query(
    `
    SELECT
      applications.*,
      jobs.title,
      jobs.company
    FROM applications
    JOIN jobs
      ON jobs.id = applications.job_id
    WHERE applicant_id = ?
    `,
    [userId],
  );

  return rows;
};

const getApplicants = async (jobId) => {
  const [rows] = await db.pool.query(
    `
    SELECT
      applications.*,
      users.name,
      users.email
    FROM applications
    JOIN users
      ON users.id = applications.applicant_id
    WHERE job_id = ?
    `,
    [jobId],
  );

  return rows;
};

const updateStatus = async (applicationId, status) => {
  const [result] = await db.pool.query(
    `
    UPDATE applications
    SET status=?
    WHERE id=?
    `,
    [status, applicationId],
  );

  return result;
};

module.exports = {
  applyJob,
  getMyApplications,
  getApplicants,
  updateStatus,
};
