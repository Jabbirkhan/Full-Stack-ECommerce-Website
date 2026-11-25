import { useContext, useState } from "react"
import { Context } from "../context/Context"

const OrdersList = () => {
  const { currency, orders, statusHandler } = useContext(Context);

  if (orders.length === 0) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
        <div className='flex flex-col'>
          <h2 className='mb-5 text-white'>No orders exist yet</h2>
          <button className='px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200'>Check back later</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-900 text-white">
      <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-400">Orders Page</h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index} 
            className="bg-gray-800 shadow-md rounded-2xl border border-gray-200 p-5 md:p-8"
          >
            {/* Order ID */}
            <div className="mb-4">
              <p className="text-sm md:text-base font-semibold text-gray-200">
                Order ID: <span className="text-gray-300">{order._id}</span>
              </p>
            </div>

            {/* Grid layout for sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Products Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Products Info</h4>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm">
                      {item.name}: <b>{item.quantity}</b> 
                      <span className="ml-1"><b>{item.sizes}</b></span>
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-gray-400">
                  Items Count: {order.items.length}
                </p>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Customer Info</h4>
                <p className="text-sm font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p className="text-sm mt-1">
                  {order.address.city}, {order.address.street}, {order.address.zipCode}
                </p>
                <p className="text-sm mt-1">{order.address.phone}</p>
              </div>

              {/* Payment Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Payment Info</h4>
                <p className="text-sm">Method: {order.paymentMethod}</p>
                <p className="text-sm">Payment: 
                  <span className={order.payment ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {order.payment ? " Done" : " Pending"}
                  </span>
                </p>
                <p className="text-sm mt-1">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm font-semibold mt-2">
                  Total: {currency}{order.amount}
                </p>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">Status</h4>
                <select 
                  className="w-full outline-none p-2 border-2 border-gray-300 text-black rounded-lg font-semibold text-sm focus:ring focus:ring-blue-300"
                  value={order.status}
                  onChange={(e) => {statusHandler(e.target.value, order._id)}}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersList


