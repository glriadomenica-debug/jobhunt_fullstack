import MyApplication from "./pages/MyApplication";
import JobSeekerLayout from "../../components/layouts/jobseekerLayout";
import JobPages from "./pages/JobPages";
import JobsDetails from "./pages/JobDetails";
import ProfileJobSeeker from "../Profile/pages/ProfilePage";

const JobSeekersRoute = [
  {
    path: "/applications/mine",
    element: <JobSeekerLayout />,
    children: [
      {
        index: true,
        element: <MyApplication />,
      },
    ],
  },
  {
    path: "/jobs",
    element: <JobSeekerLayout />,
    children: [
      {
        index: true,
        element: <JobPages />,
      },
    ],
  },
  {
    path: "/jobseekers/jobs/:id",
    element: <JobSeekerLayout />,
    children: [
      {
        index: true,
        element: <JobsDetails />,
      },
    ],
  },
  {
    path: "/jobseekers/profile",
    element: <JobSeekerLayout />,
    children: [
      {
        index: true,
        element: <ProfileJobSeeker />,
      },
    ],
  },
];
export default JobSeekersRoute;
