import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faCircleUser, faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../context/Context.jsx';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from './Loader.jsx';

const Navbar = () => {

    const { getCartCount, authState, setAuthState, navigate, userProfile } = useContext(Context);
    const profile = userProfile || {};

    const [visible, setVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const location = useLocation();

    if (location.pathname === '/login' || location.pathname === '/forget-password' || location.pathname === '/verify-email' || location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service') {
        return null;
    }

    const handleLogout = async () => {
        setVisible(false);
        try {
            const response = await axiosInstance.post(`/api/v1/user/logout`, {});
            if (response.data.success) {
                toast.success(response.data.message);
                setAuthState('unauthenticated');
                navigate('/login');
            }
        } catch (error) {
            if (error.response.status !== 401) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    const sendOtpForEmailVerification = async () => {
        try {
            if (authState !== 'authenticated') {
                return navigate('/login');
            }

            setLoader(true);
            const response = await axiosInstance.get('/api/v1/user/send-verify-email-otp');
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/verify-email');
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    if (loader) {
        return <Loader />
    }

    return (
        <header>
            <nav className='flex justify-between items-center p-4 shadow-md px-[5%]'>
                <div className='text-base sm:text-xl font-bold'>
                    <Link to='/'>TrendyCart</Link>
                </div>
                <div>
                    <ul className='hidden sm:flex gap-4 text-base'>
                        <Link className='hover:text-blue-400 transition-all duration-200' to='/'>Home</Link>
                        <Link className='hover:text-blue-400 transition-all duration-200' to='/products'>Products</Link>
                        <Link className='hover:text-blue-400 transition-all duration-200' to='/about'>About</Link>
                        <Link className='hover:text-blue-400 transition-all duration-200' to='/contact'>Contact</Link>
                    </ul>
                </div>
                <div className='flex items-center gap-2 sm:gap-4 text-base sm:text-xl cursor-pointer'>
                    <Link className='hidden sm:flex relative hover:text-blue-400 transition-all duration-200' to='/cart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <p className='absolute w-[15px] right-[-5px] top-[-10px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px] px-1 '>{getCartCount()}</p>
                    </Link>
                    <div className='group relative w-full'>
                        <FontAwesomeIcon className='text-4xl hidden sm:flex hover:text-blue-400 transition-all duration-200' icon={faCircleUser} />
                        <div className='w-[150px] absolute z-10 hidden group-hover:block top-9 right-0 bg-white shadow-md p-1 text-sm'>
                            <div className='w-full flex flex-col gap-2'>
                                <Link className='hover:text-blue-400 px-4 transition-all duration-200'>Profile</Link>
                                {profile.isAccountVerified ? (
                                    <p className="hover:text-blue-400 px-4 transition-all duration-200">
                                        Verified
                                    </p>
                                ) : (
                                    <p
                                        onClick={sendOtpForEmailVerification}
                                        className="hover:text-blue-400 px-4 transition-all duration-200"
                                    >
                                        Verify email
                                    </p>
                                )}
                                <Link to='/orders' className='hover:text-blue-400 px-4 transition-all duration-200'>Order</Link>
                                <Link onClick={handleLogout} className='hover:text-blue-400 px-4 transition-all duration-200'>{authState === 'authenticated' ? 'Logout' : 'Login'}</Link>
                            </div>
                        </div>
                    </div>
                    <FontAwesomeIcon onClick={() => setVisible(true)} className='sm:hidden hover:text-blue-400 transition-all duration-200' icon={faBars} />
                </div>
            </nav>

            {/* Responsive Navbar  */}
            <nav className={`absolute top-0 bottom-0 right-0 bg-white overflow-hidden transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex items-center gap-2 cursor-pointer p-4' onClick={() => setVisible(false)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <p>Back</p>
                </div>
                <hr />
                <div>
                    <ul className='flex flex-col items-start border-l-2 ml-2 gap-4 text-base p-4'>
                        <Link onClick={() => setVisible(false)} className='hover:text-blue-400 transition-all duration-200' to='/'>Home</Link>
                        <Link onClick={() => setVisible(false)} className='hover:text-blue-400 transition-all duration-200' to='/products'>Products</Link>
                        <Link onClick={() => setVisible(false)} className='hover:text-blue-400 transition-all duration-200' to='/about'>About</Link>
                        <Link onClick={() => setVisible(false)} className='hover:text-blue-400 transition-all duration-200' to='/contact'>Contact</Link>
                    </ul>
                </div>
                <hr />
                <div className='flex flex-col items-start border-l-2 ml-2 gap-4 text-base cursor-pointer p-4'>
                    <Link onClick={() => setVisible(false)} className='hover:text-blue-400 transition-all duration-200' to='/cart'>Cart</Link>
                    <Link onClick={() => setVisible(false)} className='hover:text-blue-400 transition-all duration-200' to='/orders'>Orders</Link>
                    <Link onClick={handleLogout} className='hover:text-blue-400 transition-all duration-200'>{authState === 'authenticated' ? 'Logout' : 'Login'}</Link>
                </div>
            </nav>

        </header>

    )
}

export default Navbar
