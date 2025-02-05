import axios from "axios"

/// upload from image url 



 export  const imageUpload = async ( imageData ) =>{

    const formData = new FormData()
    formData.append('image' , imageData)
    
 // send image data send imagbb
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}` , formData)

    const image_url = data.data.display_url ;

    return image_url 
}