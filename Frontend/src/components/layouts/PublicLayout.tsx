import { Outlet, Link, useNavigate } from "react-router-dom";

function PublicLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl md:text-3xl font-bold text-blue-600">
            JobHunt
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <Link
              to="/jobs"
              className="text-sm md:text-base font-medium text-slate-700 hover:text-blue-600"
            >
              Jobs
            </Link>

            <button
              onClick={() => navigate("/login")}
              className="px-4 md:px-6 py-2 rounded-xl bg-blue-600 text-white text-sm md:text-base hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold">
            Find Your Dream Job
          </h1>

          <p className="mt-4 text-sm md:text-lg text-blue-100 max-w-2xl">
            Discover opportunities from top companies and start your career
            journey.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold"
            >
              Apply now
            </button>

            <button
              onClick={() => navigate("/register")}
              className="border border-white px-6 py-3 rounded-xl"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default PublicLayout;
