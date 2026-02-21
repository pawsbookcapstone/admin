import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { MoreVertical } from "lucide-react";
import { collectionName, remove } from "../helpers/db";

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  privacy: string;
}

const Communities: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Fetch communities
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const docs = await collectionName("groups").getMapped((id, data) => ({
          id,
          name: data.title || "Unnamed Group",
          description: data.description || "",
          members: data.members || 0,
          image: data.profile || "https://via.placeholder.com/150",
          privacy: data.privacy || "Public"
        }));
        setCommunities(docs);
      } catch (err) {
        console.error("Error fetching communities:", err);
      }
    };
    fetchCommunities();
  }, []);

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);
  const displayedCommunities = filteredCommunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    remove("groups", id);
    setCommunities((prev) => prev.filter((c) => c.id !== id));
    setOpenMenu(null);
  };

  // Open dropdown menu with position
  const openDropdown = (id: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="p-6 bg-[#F6F6F6] min-h-screen text-gray-900">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Communities Overview
          </h1>
          <input
            type="text"
            placeholder="Search community..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 uppercase text-xs text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Community</th>
                <th className="px-6 py-3 text-left font-semibold">Description</th>
                <th className="px-6 py-3 text-left font-semibold">Members</th>
                <th className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCommunities.length > 0 ? (
                displayedCommunities.map((community) => (
                  <tr
                    key={community.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{community.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {community.description.length > 60
                        ? `${community.description.slice(0, 60)}...`
                        : community.description}
                    </td>
                    <td className="px-6 py-4">{community.members}</td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={(e) => openDropdown(community.id, e)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-gray-500 italic"
                  >
                    No communities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 text-gray-700 font-medium text-sm">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages || 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Dropdown menu using portal */}
      {openMenu && (() => {
        const community = communities.find(c => c.id === openMenu);
        if (!community) return null;
        return ReactDOM.createPortal(
          <div
            className="absolute w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            style={{ top: menuPosition.top, left: menuPosition.left }}
          >
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setSelectedCommunity(community);
                setOpenMenu(null);
              }}
            >
              View
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={() => handleDelete(community.id)}
            >
              Delete
            </button>
          </div>,
          document.body
        );
      })()}

      {/* Modal for viewing all info */}
      {selectedCommunity && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedCommunity(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <img
                src={selectedCommunity.image}
                alt={selectedCommunity.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedCommunity.name}
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {selectedCommunity.description}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Privacy:</strong> {selectedCommunity.privacy}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Members:</strong> {selectedCommunity.members}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communities;