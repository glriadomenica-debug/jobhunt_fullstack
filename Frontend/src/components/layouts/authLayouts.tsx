import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center">
        <div className="max-w-md px-8">
          <h1 className="text-4xl font-bold mb-4">
            JobHunt
          </h1>

          <p className="text-lg">
            Find your dream job and connect with top
            companies.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;