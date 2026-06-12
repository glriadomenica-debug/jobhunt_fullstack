import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApplications } from "../../../hooks/useApplications";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

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

  if (!applicants) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statusColor = (status: string) => {
    if (status === "reviewed")
      return "bg-green-100 text-green-700 border border-green-200";

    if (status === "rejected")
      return "bg-red-100 text-red-700 border border-red-200";

    return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  };

  if (applicants.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center">
          <div className="text-6xl mb-4">📄</div>

          <h2 className="text-2xl font-bold text-slate-800">
            No Applicants Yet
          </h2>

          <p className="text-slate-500 mt-2">
            Applicants will appear here after applying.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Job Applicants
        </h1>

        <p className="text-slate-500 mt-2">
          Review and manage candidate applications
        </p>
      </div>

      <div className="space-y-5">
        {applicants.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                    {app.name}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                      app.status,
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-slate-600 mt-2">{app.email}</p>

                <div className="mt-5">
                  <p className="font-semibold text-slate-700 mb-2">
                    Cover Letter
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    {app.cover_letter}
                  </p>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col gap-3">
                {app.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleStatus(app.id, "reviewed")}
                      className="flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition cursor-pointer"
                    >
                      <HiCheckCircle size={18} />
                      Accept
                    </button>

                    <button
                      onClick={() => handleStatus(app.id, "rejected")}
                      className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition cursor-pointer"
                    >
                      <HiXCircle size={18} />
                      Reject
                    </button>
                  </>
                ) : app.status === "reviewed" ? (
                  <div className="text-green-600 font-semibold text-lg">
                    ✓ Candidate Accepted
                  </div>
                ) : (
                  <div className="text-red-600 font-semibold text-lg">
                    ✕ Candidate Rejected
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicantsPage;
