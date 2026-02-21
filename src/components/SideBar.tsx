import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  BarChart3,
  Users,
  Component,
  Book,
  LogOut,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";

const Sidebar: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setShowLogoutModal(false);
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Posts", path: "/posts", icon: <FileText size={20} /> },
    { name: "Market", path: "/market", icon: <ShoppingBag size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
    { name: "Users", path: "/users", icon: <Users size={20} /> },
    { name: "Community", path: "/communities", icon: <Component size={20} /> },
    { name: "PawsBook Pages", path: "/pages", icon: <Book size={20} /> },
  ];

  return (
    <>
      <aside className="w-64 bg-white h-screen flex flex-col p-5 shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10 mt-5">
          <img
            src="/src/assets/images/PawsBook.png"
            alt="PawsBook Logo"
            className="w-40 h-auto"
          />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#FFF1D5] text-[#FFB22C] border border-[#FFCB61]"
                    : "hover:bg-[#FFCB61] hover:text-white"
                }`
              }
            >
              <span className="w-6 text-[#FFB22C]">{item.icon}</span>
              <span className="text-[#FFB22C] text-md font-bold">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center justify-center gap-2 mt-6 py-2 rounded-lg bg-[#FFF1D5] text-[#FFB22C] font-semibold border border-[#FFCB61] hover:bg-[#FFCB61] hover:text-white transition-all"
        >
          <LogOut size={18} /> Logout
        </button>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          © 2025 MyDashboard
        </div>
      </aside>

      {/* ✅ Render modal via Portal so it overlays entire viewport */}
      {showLogoutModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
            <div className="bg-white rounded-2xl p-6 w-80 shadow-xl text-center relative">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Confirm Logout
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Are you sure you want to log out of the admin dashboard?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-[#FFB22C] text-white hover:bg-[#ff9f00] text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>,
          document.body //  ensures it renders above everything
        )}
    </>
  );
};

export default Sidebar;
