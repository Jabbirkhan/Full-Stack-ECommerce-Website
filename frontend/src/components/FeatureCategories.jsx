import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

const FeatureCategories = () => {
  return (
    <section className='max-w-4xl mx-auto px-5 py-10'>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
      <div className='rounded-xl cursor-pointer'>
        <img src={assets.p_img4} alt="category-image" className='h-[320px] w-[100%] rounded-xl object-cover' loading='lazy' />
        <p className='mt-2 font-[600]'>Male</p>
      </div>
      <div className='rounded-xl cursor-pointer'>
        <img src={assets.p_img1} alt="category-image" className='h-[320px] w-[100%] rounded-xl object-cover' loading='lazy' />
        <p className='mt-2 font-[600]'>Female</p>
      </div>
      <div className='rounded-xl cursor-pointer'>
        <img src={assets.p_img3} alt="category-image" className='h-[320px] w-[100%] rounded-xl object-cover' loading='lazy' />
        <p className='mt-2 font-[600]'>Kids</p>
      </div>
    </div>
    </section>
  )
}

export default FeatureCategories
