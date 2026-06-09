import MyApplication from "./pages/MyApplication";
import JobSeekerLayout from "../../components/layouts/jobseekerLayout";

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
];
export default JobSeekersRoute;
