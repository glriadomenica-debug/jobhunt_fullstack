import { useRoutes } from "react-router-dom";
import AuthRoutes from "../modules/auth/route";
import RecruiterRoutes from "../modules/Recruiters/route";
import ProfileRoutes from "../modules/Profile/route";

export default function AppRoutes() {
  return useRoutes([...AuthRoutes, ...RecruiterRoutes, ...ProfileRoutes]);
}
