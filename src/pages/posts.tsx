import React, { useState, type JSX } from "react";
import {
  Search,
  Eye,
  Trash2,
  Calendar,
  MoreVertical,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  Globe,
  Users,
  PawPrint,
  Home,
  LayoutGrid,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  date: string;
  likes: number;
  comments: number;
  shares: number;
  approved?: boolean;
  source: "Feed" | "Community" | "Pages" | "Adoption";
  communityName?: string; // 👈 added
}

const Posts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "feed">("all");
  const [sourceFilter, setSourceFilter] = useState<
    "All" | "Feed" | "Community" | "Pages" | "Adoption"
  >("All");

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { name: "Jane Doe", avatar: "https://i.pravatar.cc/100?img=5" },
      content:
        "Meet my new golden retriever puppy! 🐶 He's full of energy and love.",
      images: [
        "https://images.unsplash.com/photo-1558788353-f76d92427f16",
        "https://images.unsplash.com/photo-1601758125946-1c1b7f9d7b5a",
      ],
      date: "2025-10-22",
      likes: 145,
      comments: 30,
      shares: 8,
      approved: true,
      source: "Feed",
    },
    {
      id: 2,
      user: { name: "John Smith", avatar: "https://i.pravatar.cc/100?img=8" },
      content: "A relaxing afternoon with my cats 🐈 lounging in the sun.",
      images: [
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
        "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
      ],
      date: "2025-10-21",
      likes: 97,
      comments: 22,
      shares: 4,
      approved: false,
      source: "Community",
      communityName: "Cat Enthusiasts 🐾", // 👈 added example
    },
    {
      id: 3,
      user: { name: "Emily Brown", avatar: "https://i.pravatar.cc/100?img=10" },
      content: "Took my corgi for a walk at the park today! 🌳🐾",
      images: [
        "https://images.unsplash.com/photo-1602067340370-28db37a4f4b8",
        "https://images.unsplash.com/photo-1568572933382-74d440642117",
      ],
      date: "2025-10-19",
      likes: 64,
      comments: 18,
      shares: 3,
      approved: true,
      source: "Pages",
    },
    {
      id: 4,
      user: { name: "Chris Green", avatar: "https://i.pravatar.cc/100?img=12" },
      content: "My parrot finally learned to say hello! 🦜💬",
      images: [
        "https://images.unsplash.com/photo-1618828669029-51d0a6bc82c9",
        "https://images.unsplash.com/photo-1609180831891-93a6fdbdb4f0",
      ],
      date: "2025-10-18",
      likes: 53,
      comments: 15,
      shares: 5,
      approved: false,
      source: "Adoption",
    },
  ]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setOpenMenuId(null);
    }
  };

  const handleApprove = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approved: true } : p))
    );
    setOpenMenuId(null);
  };

  const tabFilteredPosts = posts.filter((p) => {
    if (activeTab === "pending") return !p.approved;
    if (activeTab === "feed") return p.approved;
    return true;
  });

  const filteredPosts = tabFilteredPosts.filter((p) => {
    const matchesSearch =
      p.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate
      ? p.date === selectedDate.toISOString().split("T")[0]
      : true;
    const matchesSource =
      sourceFilter === "All" ? true : p.source === sourceFilter;
    return matchesSearch && matchesDate && matchesSource;
  });

  const sourceIcons: Record<string, JSX.Element> = {
    All: <LayoutGrid size={16} />,
    Feed: <Globe size={16} />,
    Community: <Users size={16} />,
    Pages: <Home size={16} />,
    Adoption: <PawPrint size={16} />,
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-semibold mb-6">Posts Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {[
          { label: "All", key: "all" },
          { label: "Pending", key: "pending" },
          { label: "On Feed", key: "feed" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "all" | "pending" | "feed")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-all ${
              activeTab === tab.key
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search posts or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative sm:w-1/4 flex items-center">
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

      {/* Source Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["All", "Feed", "Community", "Pages", "Adoption"].map((filter) => (
          <button
            key={filter}
            onClick={() =>
              setSourceFilter(
                filter as "All" | "Feed" | "Community" | "Pages" | "Adoption"
              )
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              sourceFilter === filter
                ? "bg-blue-50 text-blue-600 border-blue-300 shadow-sm"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {sourceIcons[filter]} {filter}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          No posts found matching your criteria.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#fdfdfd] rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between relative"
            >
              {/* Three Dot Menu */}
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === post.id ? null : post.id)
                }
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                <MoreVertical size={18} />
              </button>

              {openMenuId === post.id && (
                <div className="absolute right-3 top-8 bg-white border border-gray-200 shadow-md rounded-lg w-40 z-20">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Eye size={14} /> View Post
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                  {!post.approved && (
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                  )}
                </div>
              )}

              {/* Post Content */}
              <div className="flex items-center mb-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {post.user.name}
                  </h3>
                  {post.source === "Community" && post.communityName && (
                    <p className="text-xs text-blue-500 font-medium">
                      in {post.communityName}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {post.date} • {post.source}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {post.content}
              </p>

              {post.images && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {post.images.slice(0, 3).map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-xl overflow-hidden h-24"
                    >
                      <img
                        src={img}
                        alt={`Post ${i + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between text-gray-500 text-xs mt-auto pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <Heart size={14} className="text-red-500" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} className="text-blue-500" />{" "}
                  {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 size={14} className="text-green-500" /> {post.shares}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* View Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex items-center mb-4">
              <img
                src={selectedPost.user.avatar}
                alt={selectedPost.user.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {selectedPost.user.name}
                </h2>
                {selectedPost.source === "Community" &&
                  selectedPost.communityName && (
                    <p className="text-xs text-blue-500 font-medium">
                      in {selectedPost.communityName}
                    </p>
                  )}
                <p className="text-sm text-gray-500">
                  {selectedPost.date} • {selectedPost.source}
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{selectedPost.content}</p>

            {selectedPost.images && (
              <div className="grid grid-cols-3 gap-2">
                {selectedPost.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Post ${i + 1}`}
                    className="rounded-lg object-cover w-full h-24"
                  />
                ))}
              </div>
            )}

            <div className="flex justify-between mt-4 text-gray-500 text-sm border-t border-gray-200 pt-2">
              <span className="flex items-center gap-1">
                <Heart size={14} className="text-red-500" />{" "}
                {selectedPost.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={14} className="text-blue-500" />{" "}
                {selectedPost.comments}
              </span>
              <span className="flex items-center gap-1">
                <Share2 size={14} className="text-green-500" />{" "}
                {selectedPost.shares}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
