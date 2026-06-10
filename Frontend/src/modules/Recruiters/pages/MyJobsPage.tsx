import { useEffect, useState } from "react";
import { useJobs } from "../../../hooks/useJobs";
import DeleteConfirmModal from "../../../components/modals/DeleteConfirmModal";
import { useNavigate } from "react-router-dom";
import { TiTrash } from "react-icons/ti";
import { TiEdit } from "react-icons/ti";
import { TiDocumentText } from "react-icons/ti";

function MyJobsPage() {
  const { getMyJobs, deleteJob } = useJobs();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const data = await getMyJobs();

      setJobs(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedJobId) return;

    try {
      await deleteJob(selectedJobId);

      setIsDeleteModalOpen(false);

      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">My Jobs</h1>

            <p className="text-lg text-slate-700 tex-bold mt-2">
              Manage your job postings
            </p>
          </div>

          <button
            onClick={() => navigate("/jobs/create")}
            className=" bg-blue-600 text-white text-xl px-4 py-3 border border-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            + Create Job
          </button>
        </div>

        <div className="grid gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-blue-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                  <p className="mt-3 text-xl text-white">
                    Salary: Rp {Number(job.salary_min).toLocaleString()}
                    {" - "}
                    Rp {Number(job.salary_max).toLocaleString()}
                  </p>

                  <p className="text-lg text-white mt-1">
                    {job.company}
                  </p>

                  <p className="text-lg text-white mt-2">📍 {job.location}</p>

                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-md">
                      {job.type}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-md ${
                        job.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-4 text-md text-white">
                    {job.description}
                  </p>

                  {/* <p className="mt-3 text-md text-slate-500">Requirements:</p> */}

                  <p className="mt-4 text-md text-white">
                    {job.requirements}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => navigate(`/jobs/${job.id}/applicants`)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl cursor-pointer"
                >
                  <TiDocumentText size={15} />
                </button>

                <button
                  onClick={() => navigate(`/jobs/edit/${job.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl cursor-pointer"
                >
                  <TiEdit size={15} />
                </button>

                <button
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl cursor-pointer"
                >
                  <TiTrash size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default MyJobsPage;
