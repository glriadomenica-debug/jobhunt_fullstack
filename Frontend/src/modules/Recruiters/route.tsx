import RecruiterLayout from "../../components/layouts/recruiterLayout";
import DashboardPage from "./pages/DashboardPage";
import MyJobPage from "./pages/MyJobsPage";
import EditJobPage from "./pages/EditJobPage";
import CreateJobPage from "./pages/CreateJobPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import Profile from "../Profile/pages/ProfilePage";
import ProtectedRoute from "../../routes/ProtectedRoute";

const RecruiterRoutes = [
  {
    element: <ProtectedRoute allowedRoles={["recruiter"]} />,
    children: [
      {
        element: <RecruiterLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/my-jobs",
            element: <MyJobPage />,
          },
          {
            path: "/jobs/edit/:id",
            element: <EditJobPage />,
          },
          {
            path: "/jobs/create",
            element: <CreateJobPage />,
          },
          {
            path: "/jobs/:id/applicants",
            element: <ApplicantsPage />,
          },
          {
            path: "/recruiter/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

export default RecruiterRoutes;
