import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState(user.name);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { updateUserProfile } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

      await updateUserProfile(name);

      const updatedUser = {
        ...user,
        name,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccess("Profile updated successfully");
    } catch (error: any) {
      setError(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">My Profile</h1>

        <p className="text-slate-400 mt-2">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

        <div className="px-8 pb-8">
          {/* Avatar */}
          <div className="-mt-14 flex items-center gap-5">
            <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-white">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>

              <p className="text-slate-500">{user.email}</p>

              <span className="inline-bloc kmt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                {user.role}
              </span>
            </div>
          </div>

          {error && (
            <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                disabled
                value={user.email}
                className=" w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Account Type
              </label>

              <input
                disabled
                value={user.role}
                className=" w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="
                  bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
