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
    `block px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-white text-blue-700 font-semibold shadow-md"
        : "hover:bg-white/10 hover:translate-x-1 text-white"
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
        className={` fixed md:static top-0 left-0 h-screen w-72 bg-gradient-to-b from-black to-indigo-800 text-white shadow-xl z-50 flex-col transform
        transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 md:hidden"
        >
          <HiX size={24} />
        </button>

        <div className="p-8">
          <h1 className="text-3xl font-extrabold tracking-wide text-white">
            JobHunt
          </h1>
          {/* <p className="text-blue-100 mt-2 text-sm">Job Seeker Portal</p> */}
          <p className="text-blue-100 mt-2 text-sm">Find your dream career</p>
        </div>

        <nav className="px-4 space-y-2 flex-1">
          <NavLink
            to="/jobs"
            className={navStyle}
            onClick={() => setSidebarOpen(false)}
          >
            🔍 Jobs
          </NavLink>

          <NavLink
            to="/applications/mine"
            className={navStyle}
            onClick={() => setSidebarOpen(false)}
          >
            📄 My Applications
          </NavLink>

          <NavLink
            to="/jobseekers/profile"
            className={navStyle}
            onClick={() => setSidebarOpen(false)}
          >
            👤 My Profile
          </NavLink>
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
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 pt-20 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
}

export default JobSeekerLayout;
