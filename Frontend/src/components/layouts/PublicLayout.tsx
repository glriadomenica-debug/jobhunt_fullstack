import { Outlet, Link, useNavigate } from "react-router-dom";

function PublicLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link to="/jobs" className="text-2xl font-bold text-blue-600">
            JobHunt
          </Link>

          <div className="flex gap-4 items-center">
            <Link to="/" className="text-slate-600 hover:text-blue-600">
              Jobs
            </Link>

            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
