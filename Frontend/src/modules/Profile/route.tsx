import RecruiterLayout from "../../components/layouts/recruiterLayout";
import ProfilePage from "./pages/ProfilePage";

const ProfileRoutes = [
  {
    path: "/profile",
    element: <RecruiterLayout />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
];
export default ProfileRoutes;
