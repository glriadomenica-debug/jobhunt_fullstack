import { login, register } from "../services/authService";

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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    loginUser,
    registerUser,
    logout,
  };
};
