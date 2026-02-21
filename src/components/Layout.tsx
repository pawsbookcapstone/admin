import React from "react";
import Sidebar from "./SideBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-gray-800">
      {/* Sidebar (sticky / fixed width) */}
      <aside className="h-full sticky top-0">
        <Sidebar />
      </aside>

      {/* Main content (scrollable, full width) */}
      <main className="flex-1 h-full overflow-y-auto p-6 bg-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;
