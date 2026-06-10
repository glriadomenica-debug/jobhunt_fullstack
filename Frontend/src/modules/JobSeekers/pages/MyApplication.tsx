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
      <h1 className="text-blue-800 text-3xl font-bold mb-6">My Applications</h1>

      <div className="space-y-4">
        {apps.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-blue-800 font-bold text-2xl">{app.title}</h2>

            <p className="text-slate-600 text-lg">{app.company}</p>

            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-md ${badge(
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
