import React, { useEffect, useMemo, useState } from 'react'
import upload from '../assets/upload_area.png'
import { useContext } from 'react';
import { Context } from '../context/Context';
import { toast } from 'react-toastify';
import Loader from "./../components/Loader";
import axiosInstance from '../utils/axiosInstance.js';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const { authState, allProducts, setAllProducts } = useContext(Context);
    const products = allProducts || [];
    const { id } = useParams();

    const navigate = useNavigate();

    const product = useMemo(() => {
        return products.find((p) => p._id === id);
    }, [id, products]);

    const [loading, setLoading] = useState(false);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [price, setPrice] = useState("")
    const [sizes, setSizes] = useState([])
    const [bestSeller, setBestSeller] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setCategory(product.category);
            setSubCategory(product.subCategory);
            setPrice(product.price);
            setSizes(product.sizes);
            setBestSeller(product.bestSeller);
            setImage1(product.images[0]);
            setImage2(product.images[1]);
            setImage3(product.images[2]);
            setImage4(product.images[3]);
        }
    }, [product]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (authState !== 'authenticated') {
                return navigate('/login')
            }
            setLoading(true);
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("price", price);
            formData.append("bestSeller", bestSeller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axiosInstance.patch(`/api/v1/admin/updateproduct/${id}`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setAllProducts((prev) =>
                    prev.map((p) => p._id === response.data.product._id ? response.data.product : p)
                )
                setTimeout(() => {
                    navigate('/products');
                }, 1000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return <Loader />
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-2">Update Product</h1>
                <p className="text-gray-400 mb-6">Manage your existing product here.</p>

                <form onSubmit={onSubmitHandler} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-2">Select Images(More then 2 new images are required to update the images)</label>
                        <div className='flex flex-wrap gap-4'>
                            <label htmlFor="image1">

                                {!image1 ?
                                    <div className='flex justify-center items-center text-center rounded-sm h-20 w-20 bg-gray-300 hover:bg-gray-400 transition-all duration-200 text-white cursor-pointer'>Select Image</div>
                                    :
                                    <img className="w-20 h-20 m-2" src={typeof image1 === 'string' ? image1 : URL.createObjectURL(image1)} alt="upload-area" />
                                }
                                <input type="file" onChange={(e) => { setImage1(e.target.files[0]) }} id='image1' hidden />

                            </label>
                            <label htmlFor="image2">
                                {!image2 ?
                                    <div className='flex justify-center items-center text-center rounded-sm h-20 w-20 bg-gray-300 hover:bg-gray-400 transition-all duration-200 text-white cursor-pointer'>Select Image</div>
                                    :
                                    <img className="w-20 h-20 m-2" src={typeof image2 === 'string' ? image2 : URL.createObjectURL(image2)} alt="upload-area" />
                                }
                                <input type="file" onChange={(e) => { setImage2(e.target.files[0]) }} id='image2' hidden />
                            </label>
                            <label htmlFor="image3">
                                {!image3 ?
                                    <div className='flex justify-center items-center text-center rounded-sm h-20 w-20 bg-gray-300 hover:bg-gray-400 transition-all duration-200 text-white cursor-pointer'>Select Image</div>
                                    :
                                    <img className="w-20 h-20 m-2" src={typeof image3 === 'string' ? image3 : URL.createObjectURL(image3)} alt="upload-area" />
                                }
                                <input type="file" onChange={(e) => { setImage3(e.target.files[0]) }} id='image3' hidden />
                            </label>
                            <label htmlFor="image4">
                                {!image4 ?
                                    <div className='flex justify-center items-center text-center rounded-sm h-20 w-20 bg-gray-300 hover:bg-gray-400 transition-all duration-200 text-white cursor-pointer'>Select Image</div>
                                    :
                                    <img className="w-20 h-20 m-2" src={typeof image4 === 'string' ? image4 : URL.createObjectURL(image4)} alt="upload-area" />
                                }
                                <input type="file" onChange={(e) => { setImage4(e.target.files[0]) }} id='image4' hidden />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-2">Product Name</label>
                        <input
                            type="text"
                            placeholder="Write product name"
                            onChange={(e) => { setName(e.target.value) }}
                            value={name}
                            className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">Product Description</label>
                        <textarea
                            rows="4"
                            placeholder="Write product description"
                            onChange={(e) => { setDescription(e.target.value) }}
                            value={description}
                            className="w-full bg-gray-800 rounded-lg px-4 py-2 outline-none text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <p className='block text-sm mb-2'>Product Category</p>
                        <select onChange={(e) => setCategory(e.target.value)} className='bg-gray-800 rounded-lg px-4 py-2 outline-none text-white'>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>

                    <div>
                        <p className='block text-sm mb-2'>Product Sub-Category</p>
                        <select onChange={(e) => setSubCategory(e.target.value)} className='bg-gray-800 rounded-lg px-4 py-2 outline-none text-white'>
                            <option value="Topwear">Topwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                            <option value="Winterwear">Winterwear</option>
                        </select>
                    </div>

                    <div>
                        <p className='mb-2'>Product Price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full bg-gray-800 text-white px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
                    </div>

                    <div>
                        <p className='mb-2'>Product Sizes</p>
                        <div className='flex gap-3'>
                            <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                                <p className={`${sizes.includes("S") ? "bg-pink-100 text-black" : "bg-gray-800 text-white"} px-3 py-1 cursor-pointer`}>S</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                                <p className={`${sizes.includes("M") ? "bg-pink-100 text-black" : "bg-gray-800 text-white"} px-3 py-1 cursor-pointer`}>M</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                                <p className={`${sizes.includes("L") ? "bg-pink-100 text-black" : "bg-gray-800 text-white"} px-3 py-1 cursor-pointer`}>L</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                                <p className={`${sizes.includes("XL") ? "bg-pink-100 text-black" : "bg-gray-800 text-white"} px-3 py-1 cursor-pointer`}>XL</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                                <p className={`${sizes.includes("XXL") ? "bg-pink-100 text-black" : "bg-gray-800 text-white"} px-3 py-1 cursor-pointer`}>XXL</p>
                            </div>
                        </div>
                    </div>

                    <div className=' flex gap-2 mt-2'>
                        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id="bestseller" />
                        <label className='cursor-pointer' htmlFor="bestselller">Add to bestseller</label>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium w-full sm:w-auto">
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct
