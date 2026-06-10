import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/jobs/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStats(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Welcome Back 👋</h1>

        <p className="text-slate-200 mt-2">
          Hello {user.name}, manage your job postings and applicants here
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg">Total Jobs</h3>

          <p className="text-5xl font-bold mt-4">{stats.totalJobs}</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg">Total Applicants</h3>

          <p className="text-5xl font-bold mt-4">{stats.totalApplicants}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
