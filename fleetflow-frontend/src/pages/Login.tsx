import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ROLES } from "@/utils/constants";
import api from "@/services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      // Save JWT
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Save user in context
      login(user.username, user.role);


      navigate("/dashboard");

    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-card p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-foreground mb-1">Fleet Flow</h1>
          <p className="text-muted-foreground text-sm mb-8">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Role (Optional)
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2.5 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full border border-input rounded-lg px-3 py-2.5 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-input rounded-lg px-3 py-2.5 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-sidebar text-sidebar-foreground p-8">
        <div className="max-w-sm text-center">
          <h2 className="text-2xl font-bold text-sidebar-accent-foreground mb-3">
            New Here?
          </h2>
          <p className="text-sidebar-foreground/80 text-sm mb-6 leading-relaxed">
            Take all the information required for registration and get started with Fleet Flow to manage your fleet operations efficiently.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="border border-sidebar-foreground/30 text-sidebar-accent-foreground rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-sidebar-accent transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;