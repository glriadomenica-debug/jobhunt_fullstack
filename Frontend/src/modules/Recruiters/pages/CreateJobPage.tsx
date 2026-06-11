import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../../hooks/useJobs";
import { TiCancel } from "react-icons/ti";
import { VscSaveAs } from "react-icons/vsc";

function CreateJobPage() {
  const navigate = useNavigate();
  const { createJob } = useJobs();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("full-time");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title || !company || !location || !description || !requirements) {
      setError("Please fill all required fields");
      return;
    }
    if (!title.trim()) {
      setError("Job title is required");
      return;
    }

    if (!company.trim()) {
      setError("Company name is required");
      return;
    }

    if (Number(salaryMin) > Number(salaryMax)) {
      setError("Minimum salary cannot exceed maximum salary");
      return;
    }

    try {
      await createJob({
        title,
        company,
        location,
        type,
        description,
        requirements,
        salary_min: Number(salaryMin),
        salary_max: Number(salaryMax),
      });

      setSuccess("Job created successfully");

      setTimeout(() => {
        navigate("/my-jobs");
      }, 1500);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create job");
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Create Job
          </h1>

          <p className="text-slate-500 mt-2">
            Create a new opportunity for candidates
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company
              </label>

              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputStyle}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>

              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Requirements
              </label>

              <textarea
                rows={5}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Salary
                </label>

                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Maximum Salary
                </label>

                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className={inputStyle}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/my-jobs")}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <TiCancel size={18} />
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <VscSaveAs size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateJobPage;
