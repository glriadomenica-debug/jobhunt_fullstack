import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 relative overflow-hidden items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
          style={{
            backgroundImage:
              "url('https://m.economictimes.com/thumb/msid-78077062,width-1600,height-900,resizemode-4,imgsize-386073/job2.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-md px-8">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Connect.Hire.Grow
          </h1>

          <p className="text-lg text-white">
            The Easiest Way to Connect Job Seekers and Employers
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-indigo-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
