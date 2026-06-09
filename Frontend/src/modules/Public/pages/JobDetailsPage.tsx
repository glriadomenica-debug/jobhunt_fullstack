import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { useApplications } from "../../../hooks/useApplications";

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { applyJob } = useApplications();

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
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: { from: `/jobs/${id}` },
      });
      return;
    }

    await applyJob(Number(id), coverLetter);

    alert("Applied successfully!");
    setCoverLetter("");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-slate-800">{job.title}</h1>

        <p className="text-slate-600 mt-1">{job.company}</p>

        <div className="flex gap-2 mt-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {job.type}
          </span>

          <span className="text-slate-500 text-sm">📍 {job.location}</span>
        </div>

        <hr className="my-5" />

        <h2 className="font-bold mb-2">Job Description</h2>
        <p className="text-slate-600">{job.description}</p>

        <h2 className="font-bold mt-5 mb-2">Requirements</h2>
        <p className="text-slate-600">{job.requirements}</p>
      </div>

      {/* RIGHT APPLY CARD */}
      <div className="bg-white p-5 rounded-2xl shadow h-fit">
        <h2 className="font-bold text-lg mb-3">Apply for this job</h2>

        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Write your cover letter..."
          className="w-full border p-3 rounded-xl h-40"
        />

        <button
          onClick={handleApply}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl"
        >
          Apply Now
        </button>

        <p className="text-xs text-slate-500 mt-2">
          You must login before applying
        </p>
      </div>
    </div>
  );
}

export default JobDetailPage;
