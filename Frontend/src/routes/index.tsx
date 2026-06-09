import { useRoutes } from "react-router-dom";
import AuthRoutes from "../modules/auth/route";
import RecruiterRoutes from "../modules/Recruiters/route";
import ProfileRoutes from "../modules/Profile/route";
import JobSeekerRoutes from "../modules/JobSeekers/route";
import PublicRoutes from "../modules/Public/route";

export default function AppRoutes() {
  return useRoutes([
    ...AuthRoutes,
    ...RecruiterRoutes,
    ...ProfileRoutes,
    ...JobSeekerRoutes,
    ...PublicRoutes,
  ]);
}
