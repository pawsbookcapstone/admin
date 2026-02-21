import React, { useState } from "react";
import { Search, MoreVertical, Eye, Trash2 } from "lucide-react";

interface Page {
  id: number;
  name: string;
  avatar: string;
  owner: string;
  followers: number;
  following: number;
}

const Pages: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [pages, setPages] = useState<Page[]>([
    {
      id: 1,
      name: "Happy Paws Shelter 🐾",
      avatar: "https://images.unsplash.com/photo-1601758125946-1c1b7f9d7b5a",
      owner: "Jane Doe",
      followers: 1250,
      following: 240,
    },
    {
      id: 2,
      name: "Cat Lovers Hub 🐱",
      avatar: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
      owner: "John Smith",
      followers: 980,
      following: 310,
    },
    {
      id: 3,
      name: "Puppy Paradise 🐶",
      avatar: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
      owner: "Emily Brown",
      followers: 2040,
      following: 190,
    },
    {
      id: 4,
      name: "Exotic Birds Club 🦜",
      avatar: "https://images.unsplash.com/photo-1618828669029-51d0a6bc82c9",
      owner: "Chris Green",
      followers: 450,
      following: 80,
    },
    {
      id: 5,
      name: "Pet Grooming Experts ✂️",
      avatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
      owner: "Sarah White",
      followers: 890,
      following: 220,
    },
    {
      id: 6,
      name: "Wildlife Watchers 🦁",
      avatar: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
      owner: "Alex Johnson",
      followers: 730,
      following: 110,
    },
  ]);

  // Filtering
  const filteredPages = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPages = filteredPages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);

  // Handlers
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      setPages((prev) => prev.filter((p) => p.id !== id));
      setOpenMenuId(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-semibold mb-6">Pages Management</h1>

      {/* Search bar */}
      <div className="relative w-full sm:w-1/3 mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by page or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 font-medium">Page</th>
              <th className="px-6 py-3 font-medium">Owner</th>
              <th className="px-6 py-3 font-medium text-center">Followers</th>
              <th className="px-6 py-3 font-medium text-center">Following</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPages.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-6 italic"
                >
                  No pages found.
                </td>
              </tr>
            ) : (
              currentPages.map((page) => (
                <tr
                  key={page.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={page.avatar}
                      alt={page.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {page.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{page.owner}</td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {page.followers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {page.following.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === page.id ? null : page.id)
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenuId === page.id && (
                      <div className="absolute right-4 top-10 bg-white border border-gray-200 rounded-lg shadow-md w-36 z-10">
                        <button
                          onClick={() => alert(`Viewing ${page.name}`)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Eye size={14} /> View Page
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium border ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pages;
