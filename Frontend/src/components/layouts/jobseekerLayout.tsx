import { Outlet, NavLink, useNavigate } from "react-router-dom";

function JobSeekerLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }: any) =>
    `block px-4 py-3 rounded-xl transition ${
      isActive ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="h-screen flex bg-slate-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">JobHunt</h1>

        <nav className="space-y-2 flex-1">
          <NavLink to="/jobs" className={linkClass}>
            🔍 Jobs
          </NavLink>

          <NavLink to="/applications/mine" className={linkClass}>
            📄 My Applications
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 rounded-xl"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default JobSeekerLayout;
