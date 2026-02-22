import React, { useEffect, useMemo, useState } from "react";
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
import { collectionName, find, remove, set, update } from "../helpers/db";
import { useAppContext } from "../AppsProvider";

const Gcash: React.FC = () => {
  const {userId, gcashNumber, setGcashNumber} = useAppContext()

  const [number, setNumber] = useState<string>(gcashNumber ?? "");
  const [status, setStatus] = useState<string>("");

  const handleUpdate = async () => {
    if (number.trim().length == 0){
      alert("Please provide the gcash number")
      return
    }

    setStatus("Saving...")
    await update("admin_users", userId!).value({
      gcash_number: number
    })
    setGcashNumber(number)
    setStatus("Saved.")
  };

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#ffffff] min-h-screen text-gray-800 overflow-x-hidden">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Gcash Number</h1>

      {/* --- Top Row: Reports & Communities --- */}
      <div className="p-5 rounded-lg bg-gray-50 shadow">
        
        <input
          type="text"
          placeholder="Enter gcash number here..."
           value={number} onChange={e => setNumber(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 items-center mt-4">
          <div onClick={handleUpdate} className="px-4 hover:bg-teal-700 cursor-pointer py-1 rounded-md bg-teal-600 w-fit text-white">
            Update
          </div>
          <div>{status}</div>
        </div>
      </div>
    </div>
  );
};

export default Gcash;
