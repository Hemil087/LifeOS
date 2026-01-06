import { useState } from "react";
import Card from "../../components/Card";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(form);   // ✅ centralized API
      navigate("/login");         // after success
    } catch {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md space-y-6">

        {/* Header (same tone as Dashboard) */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome to LifeOS 👋
          </h1>
          <p className="text-sm text-gray-500">
            Register to manage your goals & expenses
          </p>
        </div>

        {/* Login Card */}
        <Card title="Register">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Username
              </label>
              <input
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
        </Card>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-400">
          Your data stays private & secure
        </p>

      </div>
    </div>
  );
}
