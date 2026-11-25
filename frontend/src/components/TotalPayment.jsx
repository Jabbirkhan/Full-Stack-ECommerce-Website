import React, { useContext } from 'react'
import { Context } from '../context/Context'

const TotalPayment = () => {

  const { currency, deliverFee, getCartAmount } = useContext(Context);

  return (
    <div className='max-w-sm flex flex-col gap-3 w-full bg-gray-200 rounded-md p-4'>
      <h2 className='text-xl font-[600] text-left'>Total Cart Amount</h2>
      <div className='w-full flex justify-between'>
        <p className='font-[600]'>Subtotal:</p>
        <p className='text-base'>{currency}{getCartAmount()}.00</p>
      </div>
      <div className='w-full flex justify-between'>
        <p className='font-[600]'>Shiping Fee:</p>
        <p className='text-base'>{currency}{getCartAmount() === 0 ? 0 : deliverFee}.00</p>
      </div>
      <hr className='border border-black'/>
      <div className='w-full flex justify-between'>
        <p className='font-[600]'>Total:</p>
        <p className='text-base'>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliverFee}</p>
      </div>
    </div>
  )
}

export default TotalPayment
