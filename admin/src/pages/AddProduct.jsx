import React, { useState } from 'react'
import upload from '../assets/upload_area.png'
import { useContext } from 'react';
import { Context } from '../context/Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from "./../components/Loader";
import axiosInstance from '../utils/axiosInstance';

const AddProduct = () => {

  const { authState, navigate, setProducts } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [price, setPrice] = useState("")
  const [sizes, setSizes] = useState([])
  const [bestSeller, setBestSeller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(authState !== 'authenticated'){
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

      const response = await axiosInstance.post(`/api/v1/admin/addproduct`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setProducts((prev) => [...prev, response.data.product]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setBestSeller(false);
        setSizes([])
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
        <h1 className="text-2xl font-bold mb-2">Add Product</h1>
        <p className="text-gray-400 mb-6">Manage your product here.</p>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="block text-sm mb-2">Select Images(More then 1 image)</label>
            <div className='flex flex-wrap gap-4'>
              <label htmlFor="image1">
                <img className="w-20 h-20 m-2" src={!image1 ? upload : URL.createObjectURL(image1)} alt="upload-area" />
                <input type="file" onChange={(e) => { setImage1(e.target.files[0]) }} id='image1' hidden />
              </label>
              <label htmlFor="image2">
                <img className="w-20 h-20 m-2" src={!image2 ? upload : URL.createObjectURL(image2)} alt="upload-area" />
                <input type="file" onChange={(e) => { setImage2(e.target.files[0]) }} id='image2' hidden />
              </label>
              <label htmlFor="image3">
                <img className="w-20 h-20 m-2" src={!image3 ? upload : URL.createObjectURL(image3)} alt="upload-area" />
                <input type="file" onChange={(e) => { setImage3(e.target.files[0]) }} id='image3' hidden />
              </label>
              <label htmlFor="image4">
                <img className="w-20 h-20 m-2" src={!image4 ? upload : URL.createObjectURL(image4)} alt="upload-area" />
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
