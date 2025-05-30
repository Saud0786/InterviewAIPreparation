import { API_PATHS } from "./apiPaths";
import axiosInstanse from "./axiosInstance";


const uploadImage = async (imageFile)=>{
  const formData = new FormData();
  formData.append('image',imageFile);

  try {
    const response = await axiosInstanse.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
      headers:{
        "Content-Type":'multipart/form-data',
      }
    })
    return response.data;
  } catch (error) {
    console.log("Error uploading the image", error);
    
  }
}

export default uploadImage;