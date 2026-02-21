import React, { useState } from "react";
import {
  Users,
  FileText,
  UsersRound,
  Search,
  MoreVertical,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const usersData = [
    {
      id: 1,
      name: "Jane Doe",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "John Smith",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Emily Brown",
      status: "Inactive",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "Daniel Green",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      name: "Sophia White",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 6,
      name: "Michael Johnson",
      status: "Inactive",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
    {
      id: 7,
      name: "Liam Wilson",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=7",
    },
    {
      id: 8,
      name: "Olivia Garcia",
      status: "Active",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
  ];

  const communities = [
    {
      id: 1,
      name: "Tech Enthusiasts",
      members: 320,
      status: "Active",
      image: "https://placehold.co/64x64?text=T",
    },
    {
      id: 2,
      name: "Pet Lovers",
      members: 210,
      status: "Active",
      image: "https://placehold.co/64x64?text=P",
    },
    {
      id: 3,
      name: "Travelers Hub",
      members: 150,
      status: "Inactive",
      image: "https://placehold.co/64x64?text=H",
    },
  ];

  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const usersPerPage = 4;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleToggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
    setOpenDropdown(null);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
    setOpenDropdown(null);
  };

  const handleView = (user: any) => {
    alert(`Viewing profile of ${user.name}`);
    setOpenDropdown(null);
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#ffffff] min-h-screen text-gray-800 overflow-x-hidden">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Dashboard</h1>

      {/* --- Top Row: Reports & Communities --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Reports Overview */}
        <div className="bg-[#fdfdfd] rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-100 rounded-xl mr-3">
              <FileText className="text-yellow-600 w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Reports Overview
            </h2>
          </div>

          <table className="min-w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 text-gray-600">Total Reports</td>
                <td className="text-right font-semibold text-gray-800">312</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-600">Pending</td>
                <td className="text-right font-semibold text-yellow-600">48</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-600">Resolved</td>
                <td className="text-right font-semibold text-green-600">264</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-600">Escalated</td>
                <td className="text-right font-semibold text-red-600">6</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Communities Overview */}
        <div className="bg-[#fdfdfd] rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-xl mr-3">
              <UsersRound className="text-purple-600 w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Communities Overview
            </h2>
          </div>

          <table className="min-w-full text-sm border-collapse">
            <tbody className="divide-y divide-gray-100">
              {communities.map((community) => (
                <tr key={community.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 flex items-center space-x-3">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {community.name}
                    </span>
                  </td>
                  <td className="text-right">{community.members}</td>
                  <td className="text-right">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        community.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {community.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Users Overview --- */}
      <div className="bg-[#fdfdfd] rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-xl mr-3">
              <Users className="text-blue-600 w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Users Overview
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-64">
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
        </div>

        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left bg-gray-50">
              <th className="py-2 font-medium text-gray-600 pl-2">User</th>
              <th className="py-2 font-medium text-gray-600 text-right">
                Status
              </th>
              <th className="py-2 font-medium text-gray-600 text-right pr-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition relative"
              >
                <td className="py-3 flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">{user.name}</span>
                </td>
                <td className="py-3 text-right">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 text-right relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === user.id ? null : user.id)
                    }
                    className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openDropdown === user.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-sm">
                      <button
                        onClick={() => handleView(user)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-gray-700"
                      >
                        <Eye size={14} /> View
                      </button>

                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-gray-700"
                      >
                        {user.status === "Active" ? (
                          <>
                            <Ban size={14} /> Deactivate
                          </>
                        ) : (
                          <>
                            <CheckCircle size={14} /> Activate
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-red-600"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
