import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from "./../context/Context";
import RelatedProducts from "./../components/RelatedProducts";
import Title from '../components/Title';
import Loader from '../components/Loader';

const ProductDetail = () => {

  const { id } = useParams();

  const { products, currency, addToCart } = useContext(Context);
  const [size, setSize] = useState('');

  const product = products.find((item) => item._id === id);

  // Reset size when product changes
  useEffect(() => {
    setSize('');
  }, [id]);

  return products.length === 0 ? <Loader message='Loading product detail...'/> : (
    <div className='max-w-6xl mx-auto px-4 py-10'>
      <div className='flex flex-col sm:flex-row justify-between gap-3'>

        <div className='w-full flex flex-col items-center gap-2 p-4 border border-1'>
          <img src={product.images?.[0]} className='w-full h-[300px] sm:h-[500px] object-cover' alt="Product-image1" />
          <div className='flex justify-between gap-2 mt-3 cursor-pointer'>
            <img src={product.images?.[0]} className='w-10 object-cover' alt="Product-image2" />
            <img src={product.images?.[0]} className='w-10 object-cover' alt="Product-image2" />
            <img src={product.images?.[0]} className='w-10 object-cover' alt="Product-image2" />
            <img src={product.images?.[0]} className='w-10 object-cover' alt="Product-image2" />
          </div>
        </div>

        <div className='flex flex-col gap-2 p-4 border border-1'>
          <h2 className='text-3xl font-[600]'>{product.name}</h2>
          <p className='text-gray-500'>{product.description}</p>
          <p className='font-[400]'>Category: {product.category}</p>
          <p className='font-[400]'>Sub Category: {product.subCategory}</p>
          <p className='text-xl font-[500]'>Price: {currency}{product.price}</p>
          <div className='flex flex-wrap gap-5'>
            {product.sizes.map((item, index) => (
              <span key={index} onClick={(e) => setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'bg-green-400 text-white' : ''}`}>{item}</span>
            ))}
          </div>
          <button onClick={()=>addToCart(product._id, size)} className='bg-blue-600 hover:bg-blue-700 duration-300 text-white px-4 py-2 rounded-md mt-4'>Add to Cart</button>
        </div>

      </div>
      <div className='py-10'>
        <Title title='Related Products' />
      </div>
      <div className='px-4'>
        <RelatedProducts id={product._id} category={product.category} subCategory={product.subCategory} />
      </div>
    </div>
  )
}

export default ProductDetail
