import React, { useEffect, useMemo, useState } from "react";
import { Search, Eye, Trash2 } from "lucide-react";
import { collectionName, remove } from "../helpers/db";
import { formatDate } from "../helpers/dateFormatter";

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

  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    collectionName("users")
      .whereEquals("is_page", false)
      .get()
      .then(({docs}) => {
        const temp = docs.map(f => {
          const v = f.data()
          return {
            id:f.id,
            name: `${v.firstname} ${v.lastname}`,
            email: v.email,
            avatar: v.img_path,
            joined: formatDate(v.createdAt?.toDate())
          }
        })
        setUsers(temp)
      })
  },[])

  const filtered = useMemo(() => {
    if (!searchTerm) return users

    return users.filter((p:any) => {
      const search = searchTerm.trim().toLowerCase()
      if (!p.name.toLowerCase().includes(search) &&
        !p.email.toLowerCase().includes(search)) return false
        
      return true
    })
  }, [users, searchTerm])

  const pagination = useMemo(() => {
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / usersPerPage);

    return {
      currentUsers,
      totalPages,
      indexOfFirst,
      indexOfLast
    }
  }, [currentPage, users, searchTerm])

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev:any) => prev.filter((user:any) => user.id !== id));
      remove("users", id)
    }
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < pagination.totalPages) {
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
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagination.currentUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              pagination.currentUsers.map((user:any) => (
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
                  <td className="px-6 py-3 text-gray-500">{user.joined}</td>
                  <td className="px-6 py-3 text-right flex justify-end gap-2">
                    {/* <button className="flex items-center gap-1 text-xs text-blue-600 border border-blue-200 rounded-md px-2 py-1 hover:bg-blue-50 transition">
                      <Eye size={14} /> View
                    </button> */}
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
      {filtered.length > usersPerPage && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">
              {pagination.indexOfFirst + 1}-
              {Math.min(pagination.indexOfLast, filtered.length)}
            </span>{" "}
            of {filtered.length} users
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
              disabled={currentPage === pagination.totalPages}
              className={`px-3 py-1 text-sm rounded-md border ${
                currentPage === pagination.totalPages
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
