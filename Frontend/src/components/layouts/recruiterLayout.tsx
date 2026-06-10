import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";


function RecruiterLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      <aside className="w-72 border-r border-white/60 bg-gradient-to-b from-black to-indigo-800 text-white shadow-xl flex flex-col h-screen">
        <div className="p-8">
          <h1 className="text-3xl font-bold">JobHunt</h1>

          <p className="text-blue-100 mt-2 text-sm">Recruiter Portal</p>
        </div>

        {/* Menu */}
        <nav className="px-4 space-y-2 flex-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold shadow-md"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/my-jobs"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold shadow-md"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            💼 My Jobs
          </NavLink>

          <NavLink
            to="/jobs/create"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold shadow-md"
                  : "hover:bg-white/10 text-white"
              }`
            }
          >
            ➕ Create Job
          </NavLink>

          <NavLink
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
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className=" w-full px-4 py-3 rounded-xl text-red-100 cursor-pointer transition"
          >
            <CgLogOut className="inline mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-blue-900 ">
        <Outlet />
      </main>
    </div>
  );
}

export default RecruiterLayout;
