import { login, register } from "../services/authService";
import { updateProfile } from "../services/authService";

export const useAuth = () => {
  const loginUser = async (email: string, password: string) => {
    const data = await login({
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    role: string,
  ) => {
    const data = await register({
      name,
      email,
      password,
      role,
    });

    return data;
  };

  const updateUserProfile = async (name: string) => {
    return await updateProfile(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return {
    loginUser,
    registerUser,
    logout,
    updateUserProfile,
  };
};
