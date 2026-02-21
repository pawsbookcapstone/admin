import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Tag,
  Package,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MarketItem {
  id: number;
  seller: {
    name: string;
    avatar: string;
  };
  title: string;
  description: string;
  images: string[];
  date: string;
  price: number;
  status: "pending" | "approved";
}

const Market: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">(
    "all"
  );

  const [items, setItems] = useState<MarketItem[]>([
    {
      id: 1,
      seller: {
        name: "Alice Johnson",
        avatar: "https://i.pravatar.cc/100?img=11",
      },
      title: "Golden Retriever Puppies",
      description:
        "Healthy and playful Golden Retriever puppies looking for a new home.",
      images: [
        "https://images.unsplash.com/photo-1558944351-c6d3f7f1f7c8",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22",
        "https://images.unsplash.com/photo-1557976608-dfa3d6e6c5d5",
      ],
      date: "2025-10-21",
      price: 250,
      status: "approved",
    },
    {
      id: 2,
      seller: {
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/100?img=12",
      },
      title: "Cat Toys Bundle",
      description:
        "Set of 10 colorful and safe cat toys. Great for active cats!",
      images: [
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
      ],
      date: "2025-10-20",
      price: 45,
      status: "pending",
    },
    {
      id: 3,
      seller: {
        name: "Emma White",
        avatar: "https://i.pravatar.cc/100?img=13",
      },
      title: "Bird Cage (Large)",
      description:
        "Spacious and sturdy bird cage, suitable for parrots or cockatiels.",
      images: [
        "https://images.unsplash.com/photo-1601758062779-0e6cba70f78a",
        "https://images.unsplash.com/photo-1601758174489-70f36e7c7c6b",
        "https://images.unsplash.com/photo-1601758265126-d9e4cbcf36ce",
      ],
      date: "2025-10-19",
      price: 120,
      status: "approved",
    },
  ]);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate
      ? item.date === selectedDate.toISOString().split("T")[0]
      : true;
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "pending"
        ? item.status === "pending"
        : item.status === "approved";

    return matchesSearch && matchesDate && matchesTab;
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setOpenMenuId(null);
    }
  };

  const handleApprove = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
    setOpenMenuId(null);
  };

  const handleReject = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "pending" } : item
      )
    );
    setOpenMenuId(null);
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-semibold mb-6">Marketplace Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {["all", "pending", "approved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "all" | "pending" | "approved")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab === "all" ? "All" : tab === "pending" ? "Pending" : "On Feed"}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search items or sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative w-full sm:w-1/4 flex items-center">
          <Calendar className="absolute left-3 text-gray-400 w-4 h-4" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Filter by date"
            dateFormat="yyyy-MM-dd"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          No marketplace items found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#fdfdfd] rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between relative"
            >
              {/* Menu */}
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === item.id ? null : item.id)
                }
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                <MoreVertical size={18} />
              </button>

              {openMenuId === item.id && (
                <div className="absolute right-3 top-8 bg-white border border-gray-200 shadow-md rounded-lg w-44 z-20">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Eye size={14} /> View Item
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                  {item.status === "pending" && (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                  )}
                  {item.status === "approved" && (
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                    >
                      <XCircle size={14} /> Set Pending
                    </button>
                  )}
                </div>
              )}

              {/* Seller Info */}
              <div className="flex items-center mb-3">
                <img
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {item.seller.name}
                  </h3>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-semibold text-gray-900 text-sm mb-2">
                {item.title}
              </h4>

              {/* Images Grid */}
              <div className="grid grid-cols-3 gap-1 mb-3">
                {item.images.slice(0, 3).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Item"
                    className="rounded-lg object-cover w-full h-20"
                  />
                ))}
                {item.images.length > 3 && (
                  <div className="relative rounded-lg overflow-hidden h-20 bg-gray-200">
                    <img
                      src={item.images[3]}
                      alt="More"
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm bg-black/50">
                      +{item.images.length - 3}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {item.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between text-xs text-gray-600 mt-auto pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Tag size={14} /> ${item.price}
                </span>
                <span className="flex items-center gap-1">
                  <Package size={14} />{" "}
                  {item.status === "approved" ? "Approved" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex items-center mb-4">
              <img
                src={selectedItem.seller.avatar}
                alt={selectedItem.seller.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {selectedItem.seller.name}
                </h3>
                <p className="text-xs text-gray-500">{selectedItem.date}</p>
              </div>
            </div>

            <h2 className="font-semibold text-gray-900 text-lg mb-2">
              {selectedItem.title}
            </h2>
            <p className="text-gray-700 mb-3">{selectedItem.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {selectedItem.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Item"
                  className="rounded-xl object-cover w-full h-32"
                />
              ))}
            </div>

            <div className="flex justify-between text-sm border-t pt-3 mt-3 text-gray-600">
              <span>
                <Tag size={14} className="inline mr-1" /> ${selectedItem.price}
              </span>
              <span>
                <Package size={14} className="inline mr-1" />{" "}
                {selectedItem.status === "approved" ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Market;
