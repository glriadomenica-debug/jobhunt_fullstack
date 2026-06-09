import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";

function JobSeekerLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-700 to-indigo-800 text-white shadow-xl flex flex-col h-screen">
        <div className="p-8">
          <h1 className="text-3xl font-bold">JobHunt</h1>

          <p className="text-blue-100 mt-2 text-sm">Job Seeker Portal</p>
        </div>

        <nav className="px-4 space-y-2 flex-1">
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold shadow-md"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            🔍 Jobs
          </NavLink>

          <NavLink
            to="/applications/mine"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold shadow-md"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            📄 My Applications
          </NavLink>

          {/* <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold shadow-md"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            👤 My Profile
          </NavLink> */}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full px-4 py-3 rounded-xl text-red-100 hover:bg-white/10 transition cursor-pointer"
          >
            <CgLogOut className="inline mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Outlet />
      </main>
    </div>
  );
}

export default JobSeekerLayout;
