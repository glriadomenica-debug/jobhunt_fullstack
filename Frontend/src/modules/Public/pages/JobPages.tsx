import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/jobs");
      setJobs(res.data.data);
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job: any) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "all" || job.type === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Find Your Dream Job
        </h1>

        <p className="text-slate-500">Explore thousands of opportunities</p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search jobs or company..."
          className="w-full border p-3 rounded-xl"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-xl"
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job: any) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold text-slate-800">{job.title}</h2>

            <p className="text-slate-600">{job.company}</p>
            <p className="text-slate-500 text-sm">{job.location}</p>

            <div className="mt-3">
              <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {job.type}
              </span>
            </div>

            <button
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl"
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
