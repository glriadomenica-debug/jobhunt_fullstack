import { useEffect, useState } from "react";
import axios from "axios";
import { useJobs } from "../../../hooks/useJobs";

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
  });

  const { getDashboardStats } = useJobs();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Hello <span className="font-semibold">{user.name}</span>, manage your
          job postings and applicants.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Jobs</p>

              <h2 className="text-5xl font-bold text-indigo-600 mt-3">
                {stats.totalJobs}
              </h2>
            </div>

            <div className="text-5xl">💼</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Applicants</p>

              <h2 className="text-5xl font-bold text-emerald-600 mt-3">
                {stats.totalApplicants}
              </h2>
            </div>

            <div className="text-5xl">👥</div>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">Recruiter Dashboard</h2>

        <p className="mt-3 text-blue-100">
          Create jobs, review applications and manage hiring activities from one
          place.
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
