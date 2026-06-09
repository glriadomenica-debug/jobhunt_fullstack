import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../../hooks/useJobs";

function EditJobPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { getJobById, updateJob } = useJobs();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await getJobById(Number(id));

      const job = response.data;

      setTitle(job.title);
      setCompany(job.company);
      setLocation(job.location);
      setDescription(job.description);
      setType(job.type);
      setRequirements(job.requirements);
      setSalaryMin(job.salary_min);
      setSalaryMax(job.salary_max);
      setIsActive(job.is_active === 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

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

      await updateJob(Number(id), {
        title,
        company,
        location,
        description,
        requirements,
        salary_min: salaryMin,
        salary_max: salaryMax,
        is_active: isActive ? 1 : 0,
      });

      setSuccess("Job updated successfully");

      setTimeout(() => {
        navigate("/my-jobs");
      }, 1500);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Edit Job</h1>

          <p className="text-slate-500 mt-2">
            Update your job posting information.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          {error && (
            <div className="mb-4 bg-red-100 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-100 text-green-700 p-4 rounded-xl">
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
                placeholder="Frontend Developer"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company Name
              </label>

              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google"
                className=" w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                placeholder="Jakarta, Indonesia"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            {/* Salary */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Salary
                </label>

                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className=" w-full px-4 py-3 rounded-xl border border-slate-200"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Description
              </label>

              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the job..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Requirements
              </label>

              <textarea
                rows={4}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="React, JavaScript, Tailwind"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center gap-3 text-slate-700">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4"
                />
                Active Job Posting
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/my-jobs")}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditJobPage;
