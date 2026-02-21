import React, { useState } from "react";
import { Lock, Mail, PawPrint } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login authentication (replace with real API later)
    if (email === "admin@pawsbook.com" && password === "admin123") {
      console.log("Login successful");
      // Save to localStorage or context if needed
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // redirect to Dashboard
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-linear-to-br from-[#FFF7E5] via-[#FFE9B1] to-[#FFD56B]">
      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-md border border-[#FFE3A3]">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#FFB22C]/10 p-4 rounded-full mb-3">
            <PawPrint className="text-[#FFB22C]" size={36} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            PawsBook Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB22C]/50 focus:border-[#FFB22C]"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB22C]/50 focus:border-[#FFB22C]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFB22C] hover:bg-[#e9a023] text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} PawsBook Admin — All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
