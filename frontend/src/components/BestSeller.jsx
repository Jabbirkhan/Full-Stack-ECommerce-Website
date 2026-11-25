import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/Context';

const BestSeller = () => {

  const { products, currency } = useContext(Context);

  return products.filter((product) => product.available === true).length > 8 && (
    <div className='max-w-6xl mx-auto px-4 py-10 relative'>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}        // show 4 at a time
        slidesPerGroup={1}       // move 1 card per click
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
        breakpoints={{
          260: { slidesPerView: 1 }, // phones ≥ 260px
          440: { slidesPerView: 2 }, // tablets ≥ 640px
          769: { slidesPerView: 3 }, // tablets ≥ 640px
          969: { slidesPerView: 4 }  // laptops ≥ 1024px
        }}
        modules={[Navigation]}
        className='mySwiper mb-12'
      >
        {products.filter((product) => product.available === true).slice(8, 16).map((product, index) => (
          <SwiperSlide key={index}>

            <Link
              to={`/productdetail/${product._id}`}
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col"
            >
              {/* Image Section */}

              <div className="relative overflow-hidden bg-slate-100">

                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-cover w-full h-[280px] sm:h-[300px] lg:h-[320px] group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category */}

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold rounded-full shadow-md">
                    {product.category}
                  </span>
                </div>

                {/* View Product Button */}

                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>

              </div>


              {/* Product Information */}

              <div className="flex flex-col flex-1 p-4">

                {/* Category */}

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                  {product.category}
                </p>


                {/* Product Name */}

                <h3 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>


                {/* Description */}

                <p className="text-sm text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {product.description}
                </p>


                {/* Price + Action */}

                <div className="flex items-center justify-between mt-auto pt-4">

                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">
                      Price
                    </p>

                    <p className="text-lg sm:text-xl font-bold text-slate-900">
                      {currency}{product.price}.00
                    </p>
                  </div>


                  <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all duration-300">
                    View
                    <span className="text-base">
                      →
                    </span>
                  </div>

                </div>

              </div>

            </Link>

          </SwiperSlide>
        ))}
      </Swiper>

      <div className='absolute flex gap-3'>
        <div className='custom-prev cursor-pointer'><FontAwesomeIcon icon={faChevronLeft} /></div>
        <div className='custom-next cursor-pointer'><FontAwesomeIcon icon={faChevronRight} /></div>
      </div>

    </div>
  )
}

export default BestSeller
