// import JobsPage from "../../../modules/Public/pages/JobPages";
// export default function JobPage() {
//   return <JobsPage />;
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

function JobsPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data.data);

        setJobs(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }
  console.log("Jobs State:", jobs);

  const filteredJobs = jobs.filter((job: any) => {
    const title = job.title || "";
    const company = job.company || "";

    const matchSearch =
      title.toLowerCase().includes(search.toLowerCase()) ||
      company.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "all" || job.type === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
          Welcome Back, {user.name} 👋
        </h1>

        <p className="text-sm md:text-lg text-slate-500 mt-2">
          Discover new opportunities and track your applications
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col lg:flex-row gap-3">
        <input
          type="text"
          placeholder="Search jobs or company..."
          className="flex-1 border border-slate-300 text-slate-800 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-slate-300 text-slate-800 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      {/* GRID JOBS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredJobs.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl p-10 text-center shadow">
            <h3 className="text-xl font-semibold text-slate-700">
              No jobs available
            </h3>

            <p className="text-slate-500 mt-2">
              There are currently no active job postings.
            </p>
          </div>
        )}

        {filteredJobs.map((job: any) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-slate-900 text-xl font-bold">{job.title}</h2>

            <p className="text-slate-700 font-medium">{job.company}</p>
            <p className="text-black text-sm mt-1">
              Rp {Number(job.salary_min).toLocaleString()} - Rp{" "}
              {Number(job.salary_max).toLocaleString()}
            </p>

            <p className="text-slate-500 text-sm mt-1">📍{job.location}</p>

            <div className="mt-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                {job.type}
              </span>
            </div>

            <button
              onClick={() => navigate(`/jobseekers/jobs/${job.id}`)}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobsPage;
