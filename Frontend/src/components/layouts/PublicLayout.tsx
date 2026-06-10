import { Outlet, Link, useNavigate } from "react-router-dom";

function PublicLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            JobHunt
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="font-medium text-black hover:text-blue-600 transition"
            >
              Jobs
            </Link>

            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:shadow-lg transition cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        {/* <div className="max-w-7xl mx-auto px-6 py-20"> */}
        <div className="mx-auto px-50 py-10">
          <h1 className="text-5xl font-bold leading-tight">
            Find Your Dream Job
          </h1>

          <p className="mt-4 text-xl text-blue-100 max-w-2xl">
            Discover opportunities from top companies and start your next career
            journey today.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-black"
            >
              Apply Now
            </button>

            <button
              onClick={() => navigate("/register")}
              className="border border-white text-blue-700 bg-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:bg-black"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>

      <main className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white mx-auto px-50 py-10 ">
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
