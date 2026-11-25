import { useContext, useState } from "react";
import { Context } from "../context/Context.jsx";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance.js";

const Checkout = () => {

    const { products, deliverFee, getCartAmount, currency, navigate, cartData, cartItems, backendUrl, token } = useContext(Context);

    const [method, setMethod] = useState('');
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        street: "",
        zipCode: ""
    });

    const onChengeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            if (method === '') {
                toast.error("Please select a payment method")
                return null;
            }
            // here we are creating order items array with all the required information to place an order, we will send this array to backend and save in database, and also use this array to show order details in order page
            let orderItems = []; // we are creating order items array from cart items, we will send this array to backend and save in database, and also use this array to show order details in order page, we will add all the required information like name, price, image, size, quantity etc in this order items array, so that we can show all the information in order details page without making another request to backend to get product details
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) { // if quantity is greater than 0, then we will add that item to order items array
                        const itemInfo = structuredClone(products.find((product) => product._id === itemId)); // we are using structuredClone to create a deep copy of the product object, because we will be adding size and quantity properties to this object, and we don't want to mutate the original product object in products array
                        if (itemInfo) { // if product is found in products array, then we will add size and quantity properties to that product object, and push that object to order items array
                            itemInfo.sizes = size
                            itemInfo.quantity = cartItems[itemId][size]
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            const orderData = {
                items: orderItems,
                address: formData,
                paymentMethod: method,
                amount: getCartAmount() + deliverFee,
            }

            if (method === "cod") {
                const response = await axiosInstance.post(`/api/v1/user/placeorder`, orderData);
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate('/orders');
                }
            }

            if (method === "stripe") {

                const idempotencyKey = sessionStorage.getItem("stripeCheckoutKey") || crypto.randomUUID();
                sessionStorage.setItem("stripeCheckoutKey", idempotencyKey);

                const response = await axiosInstance.post(`/api/v1/user/placestripeorder`, { ...orderData, idempotencyKey });
                if (response.data.success) {
                    // window.location.href = response.data.session_url;
                    const { session_url } = response.data;
                    window.location.replace(session_url);
                    sessionStorage.removeItem("stripeCheckoutKey");
                } else {
                    toast.error(response.data.message);
                }
            }

        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <div className='max-w-6xl w-full mx-auto px-4 py-10'>
            <div className='flex flex-col sm:flex-row gap-5'>

                <div className="w-full flex-1 p-2 border border-1">
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
                                            <p className='text-sm text-gray-500'>{item.quantity}</p>
                                            <span className='px-2 py-2 bg-gray-300 text-white w-8 h-8 cursor-pointer flex items-center justify-center'>{item.size}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="w-full flex flex-col flex-1 justify-start items-end p-2 border border-1">
                    <div className='max-w-sm flex flex-col gap-3 w-full bg-gray-200 rounded-md p-4'>
                        <h2 className='text-xl font-[600] text-left'>Total Cart Amount</h2>
                        <div className='w-full flex justify-between'>
                            <p className='font-[600]'>Total:</p>
                            <p className='text-base'>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliverFee}</p>
                        </div>
                    </div>
                    <div className="max-w-sm w-full flex flex-col justify-start items-start mt-4 gap-3">
                        <h2 className="text-lg font-[600] mb-2">Payment Method</h2>
                        <div className="flex justify-between items-center gap-2">
                            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                                <input type="checkbox" required />
                                <p className='text-sm text-gray-500 font-medium mx-4'>CASH ON DELIVERY</p>
                            </div>
                            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                                <input type="checkbox" required />
                                <p className='text-sm text-gray-500 font-medium mx-4'>Stripe</p>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-sm w-full p-2 bg-gray-200 mt-4 rounded-md">
                        <h2 className="text-lg font-[600] mb-2">Shiping Address</h2>
                        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 w-full">
                            <input onChange={onChengeHandler} value={formData.firstName} name="firstName" className="outline-none border rounded-md px-2 py-2 text-base text-black bg-white focus:ring-2 focus:ring-black" type="text" placeholder="First Name" required />
                            <input onChange={onChengeHandler} value={formData.lastName} name="lastName" className="outline-none border rounded-md px-2 py-2 text-base text-black bg-white focus:ring-2 focus:ring-black" type="text" placeholder="Last Name" required />
                            <input onChange={onChengeHandler} value={formData.phone} name="phone" className="outline-none border rounded-md px-2 py-2 text-base text-black bg-white focus:ring-2 focus:ring-black" type="number" placeholder="Phone Number" required />
                            <input onChange={onChengeHandler} value={formData.city} name="city" className="outline-none border rounded-md px-2 py-2 text-base text-black bg-white focus:ring-2 focus:ring-black" type="text" placeholder="City" required />
                            <input onChange={onChengeHandler} value={formData.street} name="street" className="outline-none border rounded-md px-2 py-2 text-base text-black bg-white focus:ring-2 focus:ring-black" type="text" placeholder="Street" required />
                            <input onChange={onChengeHandler} value={formData.zipCode} name="zipCode" className="outline-none border rounded-md px-2 py-2 text-base text-black bg-white focus:ring-2 focus:ring-black" type="text" placeholder="Zip Code" required />
                            <button className="w-full my-2 text-lg px-3 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-md">Order</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout
