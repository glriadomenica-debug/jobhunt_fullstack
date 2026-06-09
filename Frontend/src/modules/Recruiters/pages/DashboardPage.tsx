function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Welcome Back 👋</h1>

        <p className="text-slate-500 mt-2">
          Hello {user.name}, manage your job postings and applicants here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg">Total Jobs</h3>

          <p className="text-5xl font-bold mt-4">0</p>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg">Total Applicants</h3>

          <p className="text-5xl font-bold mt-4">0</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
