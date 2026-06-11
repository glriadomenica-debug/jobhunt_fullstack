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
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              My Jobs
            </h1>

            <p className="text-slate-500 mt-2">Manage all your job postings</p>
          </div>

          <button
            onClick={() => navigate("/jobs/create")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md cursor-pointer"
          >
            + Create Job
          </button>
        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center">
            <div className="text-6xl mb-4">💼</div>

            <h2 className="text-2xl font-bold text-slate-800">No Jobs Yet</h2>

            <p className="text-slate-500 mt-2">
              Start by creating your first job posting.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {job.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-slate-600 mt-2">{job.company}</p>

                    <p className="text-slate-500 mt-1">📍 {job.location}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {job.type}
                      </span>

                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                        Rp {Number(job.salary_min).toLocaleString()}
                        {" - "}
                        Rp {Number(job.salary_max).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-slate-600 mt-4 line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-3">
                    <button
                      onClick={() => navigate(`/jobs/${job.id}/applicants`)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition cursor-pointer"
                    >
                      <TiDocumentText size={20} />
                    </button>

                    <button
                      onClick={() => navigate(`/jobs/edit/${job.id}`)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition cursor-pointer"
                    >
                      <TiEdit size={20} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition cursor-pointer"
                    >
                      <TiTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
