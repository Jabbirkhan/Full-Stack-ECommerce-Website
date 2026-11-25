import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

const RelatedProducts = ({ id, category, subCategory }) => {

  const { products, currency } = useContext(Context);

  const relatedProducts = products.filter((item) => item.category === category && item.subCategory === subCategory && item._id !== id);

  return (
    <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {relatedProducts.map((product, index) => (
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
      ))}
    </div>
  )
}

export default RelatedProducts
