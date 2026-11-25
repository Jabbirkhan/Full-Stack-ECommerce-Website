import Title from '../components/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context.jsx';
import TotalPayment from '../components/TotalPayment.jsx';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { products, cartItems, updateQuantity, navigate, cartData, setCartData } = useContext(Context);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  if (cartData.length === 0) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
        <div className='flex flex-col'>
          <h2 className='mb-5 text-white'>No products exist yet</h2>
          <Link to='/products' className='px-2 py-2 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition-all duration-200'>Add Product</Link>
        </div>
      </div>
    );
  }

  return (
    <>

    <div className='max-w-6xl mx-auto px-4 py-10'>
      <Title title='Your Cart' />

      <div className='hidden sm:flex justify-between items-center border-b border-gray-300 pb-3 mb-5 px-4'>
        <div className='text-xs sm:text-base md:text-xl font-[600]'>Product Info</div>
        <div className='text-xs sm:text-base md:text-xl font-[600]'>Quantity</div>
        <div className='text-xs sm:text-base md:text-xl font-[600]'>Action</div>
      </div>

      {cartData.map((item, index) => {
        const productData = products.find((product) => product._id === item._id);
        return (
          <div key={index} className='flex flex-col sm:flex-row items-center border-b border-gray-300 pb-3 mb-5 px-4'>

            <div className='flex flex-row gap-2 flex-1'>
              <div className='w-auto justify-start'>
                <img src={productData.images[0]} className='w-20 h-20 object-cover' alt="product-image" />
              </div>
              <div className='flex flex-col justify-start gap-1'>
                <p className='text-sm font-[500] sm:font-[600]'>{productData.name}</p>
                <div className='flex sm:flex-col items-start gap-3'>
                  <p className='text-sm text-gray-500'>${productData.price}.00</p>
                  <span className='px-2 py-2 bg-gray-300 text-white w-8 h-8 cursor-pointer flex items-center justify-center'>{item.size}</span>
                </div>
              </div>
            </div>

            <div className='flex flex-1 gap-28 mt-3 items-center'>
              <div className='flex justify-start flex-1'><input type="number" onChange={(e)=>{item.quantity === '' || item.quantity === 0 ? null : updateQuantity(productData._id, item.size, Number(e.target.value))}} min={1} defaultValue={item.quantity} className='border border-black text-black w-10' /></div>
              <div className='flex justify-end flex-1'><FontAwesomeIcon onClick={()=>updateQuantity(productData._id, item.size, 0)} icon={faTrash} className='text-xl hover:text-red-500 cursor-pointer' /></div>
            </div>

          </div>
        )
      })}

    </div>

    <div className='max-w-6xl w-full flex mx-auto justify-end px-4 py-5'>
      <TotalPayment/>
    </div>
    
    <div className='max-w-6xl w-full flex mx-auto justify-end px-4 py-5'>
      <button type='button' disabled={cartData.length === 0} onClick={()=>navigate('/checkout')} className='disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-500 px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md max-w-sm w-full text-center'>Check Out</button>
    </div>

    </>
  )
}

export default Cart
