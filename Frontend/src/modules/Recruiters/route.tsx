import RecruiterLayout from "../../components/layouts/recruiterLayout";
import DashboardPage from "./pages/DashboardPage";
import MyJobPage from "./pages/MyJobsPage";
import EditJobPage from "./pages/EditJobPage";
import CreateJobPage from "./pages/CreateJobPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import ProfileRecruiter from "../Profile/pages/ProfilePage";

const RecruiterRoutes = [
  {
    path: "/Dashboard",
    element: <RecruiterLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/my-jobs",
    element: <RecruiterLayout />,
    children: [
      {
        index: true,
        element: <MyJobPage />,
      },
    ],
  },
  {
    path: "/jobs/edit/:id",
    element: <RecruiterLayout />,
    children: [
      {
        index: true,
        element: <EditJobPage />,
      },
    ],
  },
  {
    path: "/jobs/create",
    element: <RecruiterLayout />,
    children: [
      {
        index: true,
        element: <CreateJobPage />,
      },
    ],
  },
  {
    path: "/jobs/:id/applicants",
    element: <RecruiterLayout />,
    children: [
      {
        index: true,
        element: <ApplicantsPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <RecruiterLayout />,
    children: [
      {
        index: true,
        element: <ProfileRecruiter />,
      },
    ],
  },
];
export default RecruiterRoutes;
