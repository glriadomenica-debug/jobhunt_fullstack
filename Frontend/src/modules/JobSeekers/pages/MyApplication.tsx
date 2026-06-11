import { useEffect, useState } from "react";
import { useApplications } from "../../../hooks/useApplications";

function MyApplicationsPage() {
  const { getMyApplications } = useApplications();
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMyApplications();
      setApps(res.data);
    };

    fetch();
  }, []);

  const badge = (status: string) => {
    if (status === "accepted") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
        My Applications
      </h1>

      <p className="text-slate-500 mb-6">
        Track the status of all your job applications
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {apps.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
            <div className="text-5xl mb-3">📄</div>

            <h3 className="text-xl font-semibold text-slate-800">
              No Applications Yet
            </h3>

            <p className="text-slate-500 mt-2">
              Start applying to jobs and track them here.
            </p>
          </div>
        )}

        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-slate-900 font-bold text-xl md:text-2xl">
              {app.title}
            </h2>

            <p className="text-slate-600 font-medium mt-1">{app.company}</p>

            <span
              className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${badge(
                app.status,
              )}`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplicationsPage;
