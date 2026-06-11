import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

function JobsPage() {
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
    return <div>Loading jobs...</div>;
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
        {/* <h1 className="text-3xl font-bold text-slate-800">
          Find Your Dream Job
        </h1> */}

        <p className="text-slate-900 text-xl">
          Explore thousands of opportunities
        </p>
      </div>

      <div className="p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search jobs or company..."
          className="w-full border border-white p-3 rounded-xl"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-white p-3 rounded-xl"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-blue-700 text-2xl font-bold ">{job.title}</h2>

            <p className="text-white">{job.company}</p>

            <p className="text-white text-sm">📍{job.location}</p>

            <div className="mt-3">
              <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {job.type}
              </span>
            </div>

            <button
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl cursor-pointer hover:text-black hover:bg-blue-800 hover:font-bold"
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
