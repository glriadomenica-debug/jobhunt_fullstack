import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { useApplications } from "../../../hooks/useApplications";

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { applyJob } = useApplications();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data.data);
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setError("");
    setSuccess("");

    if (!coverLetter.trim()) {
      setError(
        "Please enter a cover letter before submitting your application.",
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          state: {
            from: `/jobs/${id}`,
          },
        });

        return;
      }

      const result = await applyJob(Number(id), coverLetter);

      console.log("APPLY RESULT:", result);

      setSuccess("Your application has been submitted successfully.");
      setHasApplied(true);
      setCoverLetter("");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to submit application. Please try again.",
      );
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-1 gap-3">
      <div className="md:col-span-2 bg-blue-800 p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-black">{job.title}</h1>

        <p className="text-white mt-1">{job.company}</p>

        <div className="flex gap-2 mt-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-md">
            {job.type}
          </span>

          <span className="text-white text-md">📍 {job.location}</span>
        </div>

        <hr className="my-5" />

        <h2 className="font-bold text-white text-xl mb-2">Job Description</h2>
        <p className="text-white">{job.description}</p>

        <h2 className="font-bold text-white text-xl mt-5 mb-2">Requirements</h2>
        <p className="text-white">{job.requirements}</p>
      </div>

      <div className="bg-blue-800 p-5 rounded-2xl shadow h-fit">
        <h2 className="font-bold text-white text-xl mb-3">Apply for this job</h2>
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-700">{success}</p>
          </div>
        )}

        <textarea
          value={coverLetter}
          required
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Write your cover letter..."
          className="w-full border p-3 rounded-xl h-40"
        />

        <button
          disabled={hasApplied}
          onClick={handleApply}
          className={`px-7 mt-4 py-2 rounded-xl text-white transition ${
            hasApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 cursor-pointer"
          }`}
        >
          {hasApplied ? "Application Submitted" : "Apply Now"}
        </button>

        {/* <p className="text-xs text-slate-500 mt-2">
          You must login before applying
        </p> */}
      </div>
    </div>
  );
}

export default JobDetailPage;
