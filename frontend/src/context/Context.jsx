import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axiosInstance from "./../utils/axiosInstance.js";
import Loader from "../components/Loader.jsx";

export const Context = createContext();

const ContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const currency = '$';
    const deliverFee = 10;

    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const [cartItems, setCartItems] = useState({});
    const [cartData, setCartData] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [authState, setAuthState] = useState('checking');
    const [userProfile, setUserProfile] = useState({});

    const verifyUser = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/verify`);
            if (response.data.success) {
                setAuthState('authenticated');
            }
        } catch (error) {
            setAuthState('unauthenticated');
            if (error.response.status !== 401) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    useEffect(()=>{
        verifyUser();
    },[])

    const getAllProducts = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/products`);
            if (response.data.success) {
                setProducts(response.data.newProducts);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            getAllProducts();
        }
    }, [authState]);
    
    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/profile`);
            if (response.data.success) {
                setUserProfile(response.data.user);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            fetchUserProfile();
        }
    }, [authState]);

    const getUserCart = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/cart`);
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            getUserCart();
        }
    }, [authState]);

    const getUserOrders = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/orders`);
            if (response.data.success) {
                setOrders(response.data.userOrder);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            getUserOrders();
        }
    }, [authState]);


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        const cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (authState === 'authenticated') {
            try {
                const response = await axiosInstance.post(`/api/v1/user/addtocart`, { itemId, size });
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    totalCount += cartItems[itemId][size];
                }
            }
        }
        return totalCount;
    }

    useEffect(() => {
        if (authState === 'authenticated') {
            getCartCount();
        }
    }, [cartItems]);

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const item = products.find((product) => product._id === itemId);
                totalAmount += item.price * cartItems[itemId][size];
            }
        }
        return totalAmount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        if (quantity <= 0) {
            delete cartData[itemId][size]
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }
        setCartItems(cartData);

        if (authState === 'authenticated') {
            try {
                const response = await axiosInstance.patch(`/api/v1/user/updatecart`, { itemId, size, quantity });
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    const value = useMemo(()=>({
        currency, navigate, deliverFee, backendUrl,
        showSearchBar, setShowSearchBar,
        searchInput, setSearchInput,
        addToCart, getCartCount, updateQuantity, getCartAmount,
        cartItems, setCartItems,
        cartData, setCartData,
        products, setProducts,
        authState, setAuthState,
        orders, getUserOrders,
        userProfile, fetchUserProfile, getUserCart
    }),[authState, products, orders, cartItems, cartData, userProfile]);

    return (
        <>
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
        </>
    )
}

export default ContextProvider;
