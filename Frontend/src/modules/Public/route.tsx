import JobPages from "./pages/JobPages";
import JobDetails from "./pages/JobDetailsPage";
import PublicLayout from "../../components/layouts/PublicLayout";

const PublicRoute = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "jobs",
        element: <JobPages />,
      },
      {
        path: "jobs/:id",
        element: <JobDetails />,
      },
    ],
  },
];

export default PublicRoute;
