import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className='max-w-6xl mx-auto px-4 py-12'>
      <div className='relative rounded-xl overflow-hidden'>
        <img src={assets.hero_img4} alt="Hero-Image" className='w-full h-64 md:h-96 object-cover' />
        <div className='absolute inset-0 flex flex-col justify-end items-start sm:items-center px-4 py-4 text-white'>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            Tech, Fashion and Lifestyle
          </h1>
          <p className="mt-2 max-w-full text-base md:text-xl text-white">
            Explore the latest trends and must have item in tech, fashion and lifestyle. Shop now and elevate your style.
          </p>
          <Link to='/products' className='px-4 py-3 bg-blue-700 text-white text-base rounded-full mt-5 hover:bg-blue-600 transition-all duration-100'>Explore Products</Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
