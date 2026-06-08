import api from "./api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};
