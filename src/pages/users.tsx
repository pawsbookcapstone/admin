import React, { useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  avatar: string;
  joined: string;
}

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=1",
      joined: "2024-08-12",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      status: "Suspended",
      avatar: "https://i.pravatar.cc/100?img=2",
      joined: "2024-07-25",
    },
    {
      id: 3,
      name: "Emily Brown",
      email: "emily.brown@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=3",
      joined: "2024-06-10",
    },
    {
      id: 4,
      name: "Chris Green",
      email: "chris.green@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=4",
      joined: "2024-09-03",
    },
    {
      id: 5,
      name: "Sophia Wilson",
      email: "sophia.wilson@example.com",
      status: "Suspended",
      avatar: "https://i.pravatar.cc/100?img=5",
      joined: "2024-09-15",
    },
    {
      id: 6,
      name: "James Taylor",
      email: "james.taylor@example.com",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=6",
      joined: "2024-10-02",
    },
  ]);

  // Filter users by search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-semibold mb-8">Users Management</h1>

      {/* Search Bar */}
      <div className="relative w-full sm:w-1/3 mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-[#fdfdfd] border border-gray-200 rounded-2xl shadow-sm">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">{user.joined}</td>
                  <td className="px-6 py-3 text-right flex justify-end gap-2">
                    <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 rounded-md px-2 py-1 hover:bg-blue-50 transition">
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center gap-1 text-xs text-red-600 border border-red-200 rounded-md px-2 py-1 hover:bg-red-50 transition"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">
              {indexOfFirstUser + 1}-
              {Math.min(indexOfLastUser, filteredUsers.length)}
            </span>{" "}
            of {filteredUsers.length} users
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm rounded-md border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm rounded-md border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
