import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from './../../../Api/Utils';
import useAuth from './../../../hooks/useAuth';
import { useState } from 'react';

import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';








const AddPlant = () => {
 const {user} = useAuth()
const axiosSecure = useAxiosSecure()

 const [upLoadButtonImage, setUpLoadButtonImage] = useState({image:{name: 'Upload Button'}})

 const [loading , setLoading ] = useState(false) 

  const handleSubmit = async (e)=>{
    e.preventDefault()
    // loding
    setLoading(true)
     const from = e.target 
     const name = from.name.value 
     const description = from.description.value 
     const category = from.category.value 
     const price = parseFloat(from.price.value )
     const quantity =parseInt(from.quantity.value )
  const image = from.image.files[0] 
  const imageURL = await imageUpload(image)

  // seller information 
  const seller ={
    name: user?.displayName ,
    image: user?.photoURL ,
    email: user?.email , 
  }

  // create plant data object 
  const palntData = {
    name ,
    description ,
    category ,
    price ,
    quantity , 
    image: imageURL ,
    seller ,
  }

  console.table(palntData)


  // save plant data db 
  try{
// post requise 
 await axiosSecure.post('/plants' , palntData)
toast.success('suuess fully')
  }
  catch (err){
    console.log(err)
    toast.error('you worng tofael ')

  }
  finally{
    setLoading(false)
  }



  //  try{
    // post req pathabu 
//  await axiosSecure.post('/plants' , palntData)

//     toast.success('Data Added Successfully!')

//   }
//   catch (err){
//     console.log(err)
//   }
//   finally{
//     setLoading(false)
//   }
  
  }

  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm 
        handleSubmit={handleSubmit} 
        upLoadButtonImage={upLoadButtonImage}
         setUpLoadButtonImage={setUpLoadButtonImage}
      loading={loading}
      />
    </div>
  )
}

export default AddPlant
