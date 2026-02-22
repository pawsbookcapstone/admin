import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Calendar,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { collectionName, update } from "../helpers/db";
import { formatDate } from "../helpers/dateFormatter";

type STATUS = "Pending" | "Confirmed" | "Declined";

const Subscriptions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<"All" | STATUS>("All");
  const [subscriptions, setSubscriptions] = useState<any>([]);

  useEffect(() => {
    collectionName("users")
      .whereEquals("is_page", true)
      .get()
      .then(({docs}) => {
        const temp = docs.map(d => {
          const v = d.data()
          return {
            id: d.id,
            name: v.firstname,
            avatar: v.img_path,
            refNumber: v.gcashRefNumber,
            status: v.subscription_status,
            date: formatDate(v.created_at.toDate())
          }
        })
        setSubscriptions(temp)
      })
  }, [])

  const filtered = useMemo(() => {
    if (activeTab === "All" && !searchTerm && !selectedDate) return subscriptions

    return subscriptions.filter((p:any) => {
      if (activeTab !== "All" && activeTab !== p.status) return false
      // if (selectedDate && selectedDate )
      const search = searchTerm.trim().toLowerCase()
      if (search && !p.name.toLowerCase().includes(search) &&
        !p.refNumber.toLowerCase().includes(search)) return false
        
      if (selectedDate && formatDate(selectedDate) !== p.date) return false

      return true
    })
  }, [subscriptions, activeTab, searchTerm, selectedDate])

  const handleStatus = (id:string, status: "Confirmed" | "Declined") => {
    setSubscriptions((prev:any) => {
      const n = [...prev]
      for (const j of n){
        if (j.id !== id) continue

        j.status = status
        break
      }
      return n
    })

    update("users", id).value({
      subscription_status: status
    })
  }

  return (
    <div className="flex-1 p-6 lg:p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-semibold mb-6">Subscription Management</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {["All", "Pending", "Confirmed", "Declined"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "All" | "Pending" | "Confirmed" | "Declined")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-all ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search subscriptions..."
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

      {/* Posts Grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          No posts found matching your criteria.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((subscription:any) => (
            <div
              key={subscription.id}
              className="bg-[#fdfdfd] rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between relative"
            >
              {/* Post Content */}
              <div className="flex items-center mb-3">
                <img
                  src={subscription.avatar}
                  alt={subscription.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {subscription.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {subscription.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 items-center mb-4">
                <label htmlFor="" className="italic text-gray-600">Reference Number :</label>
                <p className="font-semibold">
                  {subscription.refNumber}
                </p>
              </div>

              {
                subscription.status === "Pending" && <div className="flex justify-end gap-3">
                  <div 
                    className="px-3 py-1 rounded-md bg-orange-600 text-white cursor-pointer hover:bg-orange-800" 
                    onClick={() => handleStatus(subscription.id, "Declined")}
                  >Decline</div>
                  <div 
                    className="px-3 py-1 rounded-md bg-teal-600 text-white cursor-pointer hover:bg-teal-800" 
                    onClick={() => handleStatus(subscription.id, "Confirmed")}
                  >Confirm</div>
                </div>
              }

              {
                subscription.status === "Confirmed" && <div className="flex rounded-md justify-center bg-green-300 py-1 text-green-800">
                  Confirmed
                </div>
              }
              {
                subscription.status === "Declined" && <div className="flex rounded-md justify-center bg-red-300 py-1 text-red-800">
                  Declined
                </div>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
