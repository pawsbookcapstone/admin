import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

interface Community {
  id: number;
  name: string;
  description: string;
  members: number;
  image: string;
}

const Communities: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: 1,
      name: "Pet Lovers Club",
      description:
        "A fun place for animal lovers to share their stories, tips, and pet photos.",
      members: 324,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    },
    {
      id: 2,
      name: "Dog Walkers PH",
      description: "Connect with local dog walkers and plan community events.",
      members: 210,
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    },
    {
      id: 3,
      name: "Cat Enthusiasts",
      description: "For people who believe cats rule the world.",
      members: 189,
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
    },
    {
      id: 4,
      name: "Adopt & Rescue",
      description:
        "Helping stray pets find their forever homes through adoption drives.",
      members: 512,
      image: "https://images.unsplash.com/photo-1583511655621-72d8a3a1a28d",
    },
  ]);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);
  const displayedCommunities = filteredCommunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setCommunities((prev) => prev.filter((c) => c.id !== id));
    setOpenMenu(null);
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
                <th className="px-6 py-3 text-left font-semibold">
                  Description
                </th>
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
                        onClick={() =>
                          setOpenMenu(
                            openMenu === community.id ? null : community.id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === community.id && (
                        <div className="absolute right-8 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() =>
                              alert(`Viewing ${community.name} details`)
                            }
                          >
                            View
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => handleDelete(community.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
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
    </div>
  );
};

export default Communities;
