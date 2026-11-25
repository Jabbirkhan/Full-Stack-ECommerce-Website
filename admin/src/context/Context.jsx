import { useState, useEffect, createContext, useMemo } from "react";
import { toast } from "react-toastify";
import Loader from "./../components/Loader";
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

const ContextProvider = (props) => {

    const navigate = useNavigate();
    const currency = '$';

    const [authState, setAuthState] = useState('checking');
    const [orders, setOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const verifyAdmin = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/admin/verify`);
            if(response.data.success){
                setAuthState('authenticated');
            }
        } catch (error) {
            setAuthState('unauthenticated'); // fallback
            if(error.response.status !== 401){
                toast.error(error.response?.data?.message);
            }
        }
    }

    useEffect(()=>{
        verifyAdmin();
    }, []);

    const getAllOrders = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/admin/allorders`);
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    useEffect(() => {
        if(authState === 'authenticated'){
            getAllOrders();
        }
    }, [authState])

    const statusHandler = async (status, orderId) => {
        try {
            const response = await axiosInstance.patch(`/api/v1/admin/updatestatus/${orderId}`, {status});
            if (response.data.success) {
                toast.success(response.data.message);
                await getAllOrders();
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }

    const getAllProducts = async () => {
        try {
          const response = await axiosInstance.get(`/api/v1/admin/products`);
          if (response.data.success) {
            setAllProducts(response.data.newProducts);
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

    const value = useMemo(()=> ({
        navigate, currency,
        authState, setAuthState,
        orders, statusHandler,
        allProducts, setAllProducts,
    }),[authState, orders, allProducts]);

    return (
        <>
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
        </>
    )

}

export default ContextProvider