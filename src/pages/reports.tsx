import React, { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  MessageSquare,
  Package,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Report {
  id: number;
  reporter: {
    name: string;
    avatar: string;
  };
  type: "post" | "user" | "market";
  reportedItem: string;
  reason: string;
  date: string;
  status: "pending" | "resolved";
}

const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Resolved">(
    "All"
  );

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      reporter: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/100?img=8",
      },
      type: "post",
      reportedItem: "Post #1234 - 'Selling pets without permit'",
      reason: "Violates community guidelines",
      date: "2025-10-21",
      status: "pending",
    },
    {
      id: 2,
      reporter: {
        name: "Emma Brown",
        avatar: "https://i.pravatar.cc/100?img=9",
      },
      type: "user",
      reportedItem: "User: @petlover21",
      reason: "Spamming multiple posts",
      date: "2025-10-20",
      status: "resolved",
    },
    {
      id: 3,
      reporter: {
        name: "Michael Green",
        avatar: "https://i.pravatar.cc/100?img=10",
      },
      type: "market",
      reportedItem: "Listing #555 - 'Exotic birds for sale'",
      reason: "Selling illegal pets",
      date: "2025-10-19",
      status: "pending",
    },
  ]);

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedItem.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate
      ? report.date === selectedDate.toISOString().split("T")[0]
      : true;
    const matchesTab =
      activeTab === "All" ? true : report.status === activeTab.toLowerCase();
    return matchesSearch && matchesDate && matchesTab;
  });

  const handleResolve = (id: number) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r))
    );
    setOpenMenuId(null);
  };

  const handleReopen = (id: number) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "pending" } : r))
    );
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports((prev) => prev.filter((r) => r.id !== id));
      setOpenMenuId(null);
    }
  };

  const iconForType = (type: Report["type"]) => {
    switch (type) {
      case "post":
        return <MessageSquare size={14} />;
      case "user":
        return <User size={14} />;
      case "market":
        return <Package size={14} />;
      default:
        return <AlertTriangle size={14} />;
    }
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-semibold mb-8">Reports Management</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["All", "Pending", "Resolved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search reports or reporters..."
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

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          No reports found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-[#fdfdfd] rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 relative"
            >
              {/* Menu */}
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === report.id ? null : report.id)
                }
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                <MoreVertical size={18} />
              </button>

              {openMenuId === report.id && (
                <div className="absolute right-3 top-8 bg-white border border-gray-200 shadow-md rounded-lg w-44 z-20">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Eye size={14} /> View Details
                  </button>
                  {report.status === "pending" ? (
                    <button
                      onClick={() => handleResolve(report.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-green-50"
                    >
                      <CheckCircle size={14} /> Mark Resolved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReopen(report.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                    >
                      <XCircle size={14} /> Reopen
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}

              {/* Reporter Info */}
              <div className="flex items-center mb-3">
                <img
                  src={report.reporter.avatar}
                  alt={report.reporter.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {report.reporter.name}
                  </h3>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
              </div>

              {/* Report Content */}
              <div className="text-sm text-gray-700 mb-2">
                <div className="flex items-center gap-1 text-gray-600 mb-1">
                  {iconForType(report.type)}{" "}
                  <span className="font-medium capitalize">
                    {report.type} Report
                  </span>
                </div>
                <p className="font-semibold text-gray-800 line-clamp-1">
                  {report.reportedItem}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {report.reason}
                </p>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <AlertTriangle size={14} /> {report.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="flex items-center mb-4">
              <img
                src={selectedReport.reporter.avatar}
                alt={selectedReport.reporter.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {selectedReport.reporter.name}
                </h3>
                <p className="text-xs text-gray-500">{selectedReport.date}</p>
              </div>
            </div>

            <h2 className="font-semibold text-gray-900 text-lg mb-2">
              {selectedReport.reportedItem}
            </h2>
            <p className="text-gray-700 mb-3">{selectedReport.reason}</p>

            <div className="flex justify-between text-sm border-t pt-3 mt-3 text-gray-600">
              <span className="flex items-center gap-1">
                {iconForType(selectedReport.type)} {selectedReport.type}
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle size={14} />{" "}
                {selectedReport.status === "resolved"
                  ? "Resolved"
                  : "Pending Review"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
