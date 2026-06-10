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

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black">Create Job</h1>

          <p className="text-lg text-slate-400 font-bold mt-2">
            Create a new job posting.
          </p>
        </div>

        <div className="bg-blue-800 rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12">
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
            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 text-lg text-black font-bold border border-white rounded-xl"
            />

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-3 text-lg text-black font-bold border border-white rounded-xl"
            />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 text-lg text-black font-bold border border-white rounded-xl"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 text-lg text-black font-bold border border-white rounded-xl"
            >
              <option value="full-time">Full Time</option>

              <option value="part-time">Part Time</option>

              <option value="contract">Contract</option>

              <option value="internship">Internship</option>
            </select>

            <textarea
              rows={5}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-lg text-black font-bold border border-white rounded-xl"
            />

            <textarea
              rows={4}
              placeholder="Requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full p-3 text-lg text-black font-bold border border-white rounded-xl"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Minimum Salary"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="p-3 text-lg text-black font-bold border border-white rounded-xl"
              />

              <input
                type="number"
                placeholder="Maximum Salary"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="p-3 text-lg text-black font-bold border border-white rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/my-jobs")}
                className="px-5 py-3 border border-white bg-red-700 text-black cursor-pointer rounded-xl hover:bg-red-500"
              >
                <TiCancel size={20}/>
              </button>

              <button
                type="submit"
                className=" px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer rounded-xl border border-white"
              >
                <VscSaveAs size={20}/>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateJobPage;
