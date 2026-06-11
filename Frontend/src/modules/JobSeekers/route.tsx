import MyApplication from "./pages/MyApplication";
import JobSeekerLayout from "../../components/layouts/jobseekerLayout";
import JobPages from "./pages/JobPages";
import JobsDetails from "./pages/JobDetails";
import ProfileJobSeeker from "../Profile/pages/ProfilePage";
import ProtectedRoute from "../../routes/ProtectedRoute";

const JobSeekersRoute = [
  {
    element: <ProtectedRoute allowedRoles={["job_seeker"]} />, 
    children: [
      {
        element: <JobSeekerLayout />,
        children: [
          {
            path: "/applications/mine",
            element: <MyApplication />,
          },
          {
            path: "/jobs",
            element: <JobPages />,
          },
          {
            path: "/jobseekers/jobs/:id",
            element: <JobsDetails />,
          },
          {
            path: "/jobseekers/profile",
            element: <ProfileJobSeeker />,
          },
        ],
      },
    ],
  },
];
export default JobSeekersRoute;
