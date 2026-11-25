import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import Loader from '../components/Loader';
import { Context } from '../context/Context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance.js';
import Pagination from '../components/Pagination';

const Products = () => {

  const { currency, showSearchBar, searchInput, authState } = useContext(Context);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('Relevent');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setPage(1);
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setPage(1);
  };

  // const applyFilter = async () => {
  //   let productCopy = category.length > 0 || subCategory.length > 0 || (showSearchBar && searchInput)
  //     ? [...allProducts]
  //     : [...products];

  //   if (showSearchBar && searchInput) {
  //     productCopy = productCopy ? productCopy.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase())) : products;
  //   }

  //   if (category.length > 0) {
  //     productCopy = productCopy ? productCopy.filter((item) => category.includes(item.category)) : products;
  //   }

  //   if (subCategory.length > 0) {
  //     productCopy = productCopy ? productCopy.filter((item) => subCategory.includes(item.subCategory)) : products;
  //   }

  //   setFilterProducts(productCopy);
  // }

  // const sortProducts = () => {
  //   const sortProductsCopy = [...filterProducts];

  //   switch (sortType) {
  //     case 'Low-High':
  //       setFilterProducts(sortProductsCopy.sort((a, b) => a.price - b.price));
  //       break;

  //     case 'High-Low':
  //       setFilterProducts(sortProductsCopy.sort((a, b) => b.price - a.price));
  //       break;

  //     default:
  //       applyFilter();
  //       break;
  //   }
  // }

  // useEffect(() => {
  //   applyFilter();
  // }, [category, subCategory, searchInput, showSearchBar, allProducts]);

  // useEffect(() => {
  //   sortProducts();
  // }, [sortType]);

  const [loader, setLoader] = useState(false);

  const getAllProducts = async (page) => {
    try {
      setLoader(true);

      const params = new URLSearchParams();

      params.append('page', page);
      params.append('limit', 8);
      params.append('sort', sortType);

      category.forEach((item) => {
        params.append('category', item);
      });

      subCategory.forEach((item) => {
        params.append('subCategory', item);
      });

      const response = await axiosInstance.get(`/api/v1/user/products?${params.toString()}`);
      if (response.data.success) {
        setProducts(response.data.products);
        console.log("Current Products", response.data.products);
        setTotalProducts(response.data.totalProducts);
        setTotalPages(response.data.totalPages);
        setPage(response.data.currentPage);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (authState === 'authenticated') {
      getAllProducts(page);
    }
  }, [authState, page, category, subCategory, sortType]);

  // if (products.length === 0) {
  //   return (
  //     <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
  //       <div className='flex flex-col'>
  //         <h2 className='mb-5 text-white'>No products exist yet</h2>
  //         <Link to='/' className='px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200'>Home</Link>
  //       </div>
  //     </div>
  //   );
  // }

  if (loader || products.length === 0) {
    return <Loader />
  }

  return (
    <section className='relative max-w-6xl mx-auto px-4 py-10'>
      {/* title */}
      <Title title='All Products' />

      {/* Filters */}
      <div className='relative flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 mb-8 px-5 py-6 bg-gray-50 border border-gray-200 rounded-xl'>

        {/* Categories */}
        <div className='flex flex-col gap-3 text-sm text-gray-600 min-w-[130px]'>

          <p className='text-sm font-semibold text-gray-900 mb-1'>
            Categories
          </p>

          <label className='flex items-center gap-3 cursor-pointer hover:text-black transition-colors'>
            <input
              className='w-4 h-4 accent-black cursor-pointer'
              type="checkbox"
              checked={category.includes('Men')}
              value={`Men`}
              onChange={toggleCategory}
            />
            Men
          </label>

          <label className='flex items-center gap-3 cursor-pointer hover:text-black transition-colors'>
            <input
              className='w-4 h-4 accent-black cursor-pointer'
              type="checkbox"
              checked={category.includes('Women')}
              value={`Women`}
              onChange={toggleCategory}
            />
            Women
          </label>

          <label className='flex items-center gap-3 cursor-pointer hover:text-black transition-colors'>
            <input
              className='w-4 h-4 accent-black cursor-pointer'
              type="checkbox"
              checked={category.includes('Kids')}
              value={`Kids`}
              onChange={toggleCategory}
            />
            Kids
          </label>

        </div>

        {/* Divider */}
        <div className='hidden sm:block w-px self-stretch bg-gray-200'></div>

        {/* Sub Categories */}
        <div className='flex flex-col gap-3 text-sm text-gray-600 min-w-[150px]'>

          <p className='text-sm font-semibold text-gray-900 mb-1'>
            Sub Categories
          </p>

          <label className='flex items-center gap-3 cursor-pointer hover:text-black transition-colors'>
            <input
              className='w-4 h-4 accent-black cursor-pointer'
              type="checkbox"
              checked={subCategory.includes('Topwear')}
              value={`Topwear`}
              onChange={toggleSubCategory}
            />
            Topwear
          </label>

          <label className='flex items-center gap-3 cursor-pointer hover:text-black transition-colors'>
            <input
              className='w-4 h-4 accent-black cursor-pointer'
              type="checkbox"
              checked={subCategory.includes('Bottomwear')}
              value={`Bottomwear`}
              onChange={toggleSubCategory}
            />
            Bottomwear
          </label>

          <label className='flex items-center gap-3 cursor-pointer hover:text-black transition-colors'>
            <input
              className='w-4 h-4 accent-black cursor-pointer'
              type="checkbox"
              checked={subCategory.includes('Winterwear')}
              value={`Winterwear`}
              onChange={toggleSubCategory}
            />
            Winterwear
          </label>

        </div>

        {/* Sorting */}
        <div className='sm:ml-auto sm:self-start w-full sm:w-auto'>

          <p className='text-sm font-semibold text-gray-900 mb-3'>
            Sort Products
          </p>

          <select
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value);
              setPage(1);
            }}
            className='w-full sm:w-auto min-w-[190px] bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-3 rounded-lg outline-none cursor-pointer hover:border-gray-500 focus:border-black focus:ring-2 focus:ring-gray-200 transition-all duration-200'
          >
            <option value="Relevent">Sort by: Relevent</option>
            <option value="Low-High">Sort by: Low to High</option>
            <option value="High-Low">Sort by: High to Low</option>
          </select>

        </div>

      </div>

      {/* products */}
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.filter((product) => product.available === true).map((product, index) => (
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

      {/* pagination */}
      <div className='my-10'>
        <Pagination
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </div>
    </section>
  )
}

export default Products
