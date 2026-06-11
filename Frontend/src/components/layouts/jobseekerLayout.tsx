import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

function JobSeekerLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-white text-indigo-700 font-semibold shadow-lg"
        : "text-white hover:bg-white/10 hover:translate-x-1"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-900 flex items-center justify-between px-4 md:hidden z-50">
        <h1 className="text-white font-bold text-xl">JobHunt</h1>

        <button onClick={() => setSidebarOpen(true)}>
          <HiMenu size={28} className="text-white" />
        </button>
      </header>
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-gradient-to-b from-slate-950 via-indigo-950 to-indigo-800 text-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 md:hidden"
        >
          <HiX size={24} />
        </button>

        <div className="p-8 border-b border-white/10">
          <h1 className="text-3xl font-extrabold tracking-wide">JobHunt</h1>

          <p className="text-blue-200 mt-2 text-sm">Find your dream career</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3">
          <NavLink
            to="/jobs"
            className={navStyle}
            onClick={() => setSidebarOpen(false)}
          >
            🔍 <span>Jobs</span>
          </NavLink>

          <NavLink
            to="/applications/mine"
            className={navStyle}
            onClick={() => setSidebarOpen(false)}
          >
            📄 <span>My Applications</span>
          </NavLink>

          <NavLink
            to="/jobseekers/profile"
            className={navStyle}
            onClick={() => setSidebarOpen(false)}
          >
            👤 <span>My Profile</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="mb-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Account
            </p>

            <p className="font-medium text-white mt-1">
              {JSON.parse(localStorage.getItem("user") || "{}")?.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500  hover:text-white transition-all duration-300 cursor-pointer"
          >
            <CgLogOut
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />

            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-8 pt-20 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
}

export default JobSeekerLayout;
