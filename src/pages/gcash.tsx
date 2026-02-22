import React, { useState } from "react";
import { update } from "../helpers/db";
import { useAppContext } from "../AppsProvider";
import { uploadImageFile } from "../helpers/cloudinary";

const Gcash: React.FC = () => {
  const {userId, gcashNumber, userName, userEmail, setGcashNumber, gcashNumberQR, setGcashNumberQR} = useAppContext()

  const [number, setNumber] = useState<string>(gcashNumber ?? "");
  const [qr, setQr] = useState<string>(gcashNumberQR ?? "");
  const [fqr, setFQr] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleUpdate = async () => {
    if (number.trim().length == 0){
      alert("Please provide the gcash number")
      return
    }

    let data:any = {
      gcash_number: number
    }

    if (fqr){
      const img = await uploadImageFile(fqr)
      data.gcash_qr = img
      console.log(img);
      
      setGcashNumberQR(img)
    }

    localStorage.setItem("logged_user", JSON.stringify({
      id: userId,
      name: userName,
      email: userEmail,
      gcash_number: number,
      gcash_qr: data.gcash_qr ?? gcashNumberQR
    }))
    setStatus("Saving...")
    await update("admin_users", userId!).value(data)
    setGcashNumber(number)
    setStatus("Saved.")
  };

  const handleChangeQR = () => {
    const img = document.getElementById("uploadqr")
    img?.click()
  }

  const onChangeQr = (e:any) => {
    if (e.target.files?.length == 0) return

    const file = e.target.files[0]
    setFQr(file)
    setQr(URL.createObjectURL(file))
  }

  return (
    <div className="flex-1 p-6 lg:p-10 bg-[#ffffff] min-h-screen text-gray-800 overflow-x-hidden">
      <input id="uploadqr" type="file" accept="image/*" className="hidden" onChange={onChangeQr} />
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Gcash Number</h1>

      {/* --- Top Row: Reports & Communities --- */}
      <div className="p-5 rounded-lg bg-gray-50 shadow">
        
        <img src={qr} />

          <div onClick={handleChangeQR} className="px-4 hover:bg-lime-700 mb-5 cursor-pointer py-1 rounded-md bg-lime-600 w-fit text-white">
            Change qr
          </div>

        <input
          type="text"
          placeholder="Enter gcash number here..."
           value={number} onChange={e => setNumber(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 items-center mt-4">
          <div onClick={handleUpdate} className="px-4 hover:bg-teal-700 cursor-pointer py-1 rounded-md bg-teal-600 w-fit text-white">
            Save
          </div>
          <div>{status}</div>
        </div>
      </div>
    </div>
  );
};

export default Gcash;
