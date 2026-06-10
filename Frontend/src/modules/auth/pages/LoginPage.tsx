import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { loginUser } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      const data = await loginUser(email, password);

      setSuccess("Login successful");

      setTimeout(() => {
        if (data.user.role === "recruiter") {
          navigate("/dashboard");
        } else {
          navigate("/jobs");
        }
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 min-h-[520px] rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-2 text-blue-900 font-bold">Login</h2>

      <p className="text-gray-500 mb-6">Welcome back!</p>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{error}</div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
