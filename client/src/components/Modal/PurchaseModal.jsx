/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,

} from '@headlessui/react'
import { Fragment, useState } from 'react'
import Button from '../Shared/Button/Button'

import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import { useNavigate } from 'react-router-dom';







const PurchaseModal = ({ closeModal, isOpen , plant , refetch }) => {
  const { user } = useAuth() 
  const axiosSecoure = useAxiosSecure()

const navigate = useNavigate() ;
  const { category , _id ,  name , quantity , seller , price  } = plant ;
  const [totalQuantity , seTotaltQuantity] = useState(1) ;
  const [totaPrice , seTotaltPrice] = useState(price) ;
  const [pusChaseInfo , setPurchasesInfo ] = useState({
    customer:{
      name: user?.displayName ,
      email: user?.email ,
      image: user?.photoURL ,
    } ,
plantId: _id ,
price: totaPrice ,
quantity: totalQuantity ,
seller: seller?.email ,
address: '' ,
status:'Pending' ,


  }) ;
//console.log(totalQuantity)

 
 

 // handle quantity 
 const handleQuantity = (value) => {
  if(value > quantity){
return toast.error('Quantity exceeds available stock!')
  }
  else if ( value <  0 ){
seTotaltQuantity(1)
return toast.error('Quantity can not be less than 1')
  }
  seTotaltQuantity(value)
  seTotaltPrice(value * price)
  setPurchasesInfo(prv => {
    return {...prv , quantity : value ,price:value * price }})
 }

 const handleParchase = async(e) => {
  e.preventDefault()
console.table(pusChaseInfo)
// send post request to db 
try {
await axiosSecoure.post('/order' , pusChaseInfo)
// decreasess quantity from plant collection
await axiosSecoure.patch(`/plants/quantity/${_id}` , {
  qauntityToUpate: totalQuantity ,
  status: 'decreases' , 
})
toast.success(' order success full')
navigate('/dashboard/my-orders')
refetch()
}
catch (err){
console.log(err)
toast.error('u are worng')
}
finally{
  closeModal()
}

console.log(user)


 }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Review Info Before Purchase
                </DialogTitle>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Plant: {name}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Category: {category}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Customer: {user?.displayName}</p>
                </div>

                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Price: $ {price}</p>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p>
                </div>
                {/* available quentity */}
                <div className=' mt-2 space-x-2 text-sm'>
                <label htmlFor='quantity' className=' text-gray-600'>
                  Quantity
                </label>
                <input
                max={quantity}
                value={totalQuantity}
                onChange={(e) =>handleQuantity(parseInt(e.target.value))}
                  className='px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='quantity'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                  required
                />
              </div>

              <div className='mt-2 space-x-2 text-sm'>
                <label htmlFor='quantity' className=' text-gray-600'>
                 Address
                </label>
                <input
            
                  className='px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                  name='address'
                  id='address'
                  onChange={(e) => setPurchasesInfo(prv => {
                 return {...prv , address : e.target.value}})}
                  type='text'
                  placeholder='Address'
                  required
                />
              </div>

                {/* Adrees input file  */}

             <div className="mt-3">
             <Button  onClick={handleParchase} className='' label={`Pay ${totaPrice}$` }>  </Button>
             </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal
