import { useRoutes } from "react-router-dom";
import AuthLayout from "../modules/auth/route";

export default function AppRoutes() {
  return useRoutes([...AuthLayout]);
}
