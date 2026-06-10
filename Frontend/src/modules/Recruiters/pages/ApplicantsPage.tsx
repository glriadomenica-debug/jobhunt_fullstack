import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApplications } from "../../../hooks/useApplications";

function ApplicantsPage() {
  const { id } = useParams();
  const { getApplicants, updateApplicationStatus } = useApplications();

  const [applicants, setApplicants] = useState<any[]>([]);

  const fetchApplicants = async () => {
    const res = await getApplicants(Number(id));
    setApplicants(res.data);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatus = async (appId: number, status: string) => {
    await updateApplicationStatus(appId, status as any);
    fetchApplicants(); // refresh
  };

  const statusColor = (status: string) => {
    if (status === "accepted") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Job Applicants</h1>

      <div className="space-y-4">
        {applicants.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{app.name}</h2>

                <p className="text-slate-600">{app.email}</p>

                <p className="mt-3 text-sm text-slate-500">Cover Letter:</p>

                <p className="text-slate-700">{app.cover_letter}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${statusColor(
                  app.status,
                )}`}
              >
                {app.status}
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleStatus(app.id, "accepted")}
                className="px-4 py-2 bg-green-600 text-white rounded-xl"
              >
                Accept
              </button>

              <button
                onClick={() => handleStatus(app.id, "rejected")}
                className="px-4 py-2 bg-red-600 text-white rounded-xl"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicantsPage;
