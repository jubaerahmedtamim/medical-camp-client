import axios from "axios";


const uploader = async({imageFile})=>{
    const api_Key=import.meta.env.VITE_ImageBB_api_key;
    const url = `https://api.imgbb.com/1/upload?key=${api_Key}`;

    const res = await axios.post(url, imageFile, {
        headers: {
            "content-type": "multipart/form-data",
        }
    })
    return res.data;
}

export default uploader;