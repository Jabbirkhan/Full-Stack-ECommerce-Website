import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { Context } from '../context/Context';
import axiosInstance from "./../utils/axiosInstance.js";
import Loader from '../components/Loader.jsx';

const Login = () => {

  const { setAuthState, navigate } = useContext(Context)

  const [state, setState] = useState('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loader, setLoader] = useState(false);

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'login') {
        setLoader(true);
        const response = await axiosInstance.post(`/api/v1/admin/login`, { email, password });
        if (response.data.success) {
          setAuthState('authenticated');
          toast.success(response.data.message);
          navigate("/");
        }
      } else {
        setLoader(true);
        const response = await axiosInstance.post(`/api/v1/admin/register`, { name, email, password });
        if (response.data.success) {
          setState('login');
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  if(loader){
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">{state === 'login' ? 'Admin Login' : 'Admin Register'}</h1>
        <form onSubmit={onSubmithandler} className="space-y-5">
          {state !== 'login' ? <div>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 outline-none text-white focus:ring-2 focus:ring-blue-500"
            />
          </div> : ''}
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 outline-none text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            {state === "login" ? <p onClick={() => navigate('/forget-password')} className="text-xs text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </p> : ""}
          </div>

          <div>
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 outline-none text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium" >
            {state === 'login' ? 'Login' : 'Register'}
          </button>

          {state === 'login' ?
            <p onClick={() => setState('register')} className='text-gray-600 text-base'>I didn't have an account. <span className='text-blue-500 text-lg underline hover:text-blue-600 cursor-pointer duration-200 transition-all'>Register</span></p>
            :
            <p onClick={() => setState('login')} className='text-gray-600 text-base'>I already have an account. <span className='text-blue-500 text-lg underline hover:text-blue-600 cursor-pointer duration-200 transition-all'>Login</span></p>
          }
        </form>
      </div>
    </div>
  )
}

export default Login
