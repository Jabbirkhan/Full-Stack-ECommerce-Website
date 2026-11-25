import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context';
import { toast } from "react-toastify";
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/Loader';
import Pagination from "../components/Pagination.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProductsList = () => {

  const { authState, setAllProducts } = useContext(Context);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);

  const [loader, setLoader] = useState(false);

  const handleDelete = async (productId) => {
    try {
      if (authState !== 'authenticated') {
        return navigate('/login')
      }

      setLoader(true);
      const response = await axiosInstance.delete(`/api/v1/admin/deleteproduct/${productId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        // Optionally, you can refresh the project list or remove the deleted project from the state
        setProducts(prev => prev.filter(product => product._id !== productId));
        setAllProducts(prev => prev.filter(product => product._id !== productId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  const getAllProducts = async (page) => {
    try {
      setLoader(true);
      const response = await axiosInstance.get(`/api/v1/admin/products?page=${page}&limit=6`);
      if (response.data.success) {
        setProducts(response.data.products);
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

  const updateProductAvailability = async (productId, newAvailability) => {
    try {
      setLoader(true);

      const response = await axiosInstance.patch(`/api/v1/admin/update-availability/${productId}`,
        { availability: newAvailability }
      );
      if (response.data.success) {
        getAllProducts(page);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (authState === 'authenticated') {
      getAllProducts(page);
    }
  }, [authState, page]);

  // if (products.length === 0) {
  //   return (
  //     <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
  //       <div className='flex flex-col'>
  //         <h2 className='mb-5 text-white'>No products exist yet</h2>
  //         <Link to='/' className='px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200'>Add new product</Link>
  //       </div>
  //     </div>
  //   );
  // }

  if (loader || products.length === 0) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link to='/' className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">New Product</Link>
        </div>

        {/* <div className='flex items-center justify-center gap-2'>
          <input
            type="text"
            placeholder="Search projects"
            onChange={(e) => setSearch(e.target.value)} value={search}
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 mb-4 outline-none text-white focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={searchProduct} className='flex items-center bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg'>Search</button>
        </div> */}

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left px-4 py-2">Thumbnail</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="bg-gray-800 rounded-lg">
                  <td className="px-4 py-2">
                    <img
                      src={product.images[0] ? product.images[0].replace("/upload/", "/upload/w_200,h_200,c_fill,q_auto,f_auto/") : ""}
                      alt={product.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="flex gap-2 mt-2 py-2">
                    <button onClick={() => { handleDelete(product._id) }} className="text-red-500 hover:underline">Delete</button>
                    <Link to={`/updateproduct/${product._id}`} className="text-yellow-500 hover:underline">Update</Link>
                    <button
                      onClick={() => updateProductAvailability(product._id, !product.available)}
                      className="text-green-500 hover:text-green-600 cursor-pointer"
                      title={product.available ? "Mark Unavailable" : "Mark Available"}
                    >
                      {product.available ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='my-10'>
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        </div>

      </div>
    </div>
  )
}

export default ProductsList
