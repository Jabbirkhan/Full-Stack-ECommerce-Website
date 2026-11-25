import { useContext } from 'react'
import { Context } from '../context/Context.jsx';
import { useEffect } from 'react';

const Orders = () => {
  const { currency, orders, getUserOrders } = useContext(Context);

  const handleOrderTrack = async () => {
    await getUserOrders();
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className='max-w-6xl w-full mx-auto px-4 py-10 space-y-6'>
      {orders.map((order, index) => (
        <div key={index} className='border rounded-lg shadow-sm p-5 flex flex-col gap-5'>

          {/* HEADER */}
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b pb-3'>

            <div className='text-sm text-gray-600'>
              <p>
                Total Payment:{' '}
                <span className='font-semibold text-gray-800'>
                  {currency}{order.amount}
                </span>
              </p>
              <p>
                Payment Method:{' '}
                <span className='text-gray-500'>
                  {order.paymentMethod}
                </span>
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-green-500'></span>
              <p className='text-sm md:text-base font-medium'>{order.status}</p>
            </div>

          </div>

          {/* ITEMS */}
          <div className='flex flex-col gap-4'>
            {order.items.map((item, i) => (
              <div
                key={i}
                className='flex items-start gap-4 text-sm'
              >
                <img
                  className='w-16 sm:w-20 rounded-md border'
                  src={item.images[0]}
                  alt={item.name}
                />

                <div className='flex-1'>
                  <p className='sm:text-base font-medium text-gray-800'>
                    {item.name}
                  </p>

                  <div className='flex items-center gap-3 mt-1 text-gray-600'>
                    <p>Qty: {item.quantity}</p>

                    <p className='px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs'>
                      {item.sizes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-end'>
            <button
              onClick={handleOrderTrack}
              className='border px-4 py-2 text-sm font-medium rounded-md hover:bg-black hover:text-white transition'
            >
              Track Order
            </button>
          </div>

        </div>
      ))}
    </div>
  )
}

export default Orders
