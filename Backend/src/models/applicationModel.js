const db = require("../config/db");

//menyimpan lamaran kerja
const applyJob = async (data) => {
  const [result] = await db.query("INSERT INTO applications SET ?", [data]);

  return result.insertId;
};

//menampilkan semua lamaran job-seeker
const getMyApplications = async (userId) => {
  const [rows] = await db.query(
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

//menampilkan daftar pelamar
const getApplicants = async (jobId) => {
  const [rows] = await db.query(
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

//update sttus lamaran (dilakukan oleh rekruiter)
const updateStatus = async (applicationId, status) => {
  const [result] = await db.query(
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
