import Login from "./pages/LoginPage";
import RegisterPage from "./pages/Register";
import AuthLayout from "../../components/layouts/authLayouts";

const AuthRoutes = [
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
];
export default AuthRoutes;
