import axios from "axios";

const uploadImageFile = async (file:File) => {
  try {
    const formData = new FormData();

    formData.append("file", file); // ✅ actual file
    formData.append("upload_preset", "images");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dnvnkh2md/image/upload",
      formData
    );

    return res.data.secure_url;
  } catch (e) {
    console.log(e);
    return null;
  }
};


export { uploadImageFile };
