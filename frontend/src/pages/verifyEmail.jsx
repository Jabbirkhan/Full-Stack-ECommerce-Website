
import { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { FiMail, FiShield, FiArrowRight, FiLock } from 'react-icons/fi';
import { Context } from '../context/Context';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/Loader';

const VerifyEmail = () => {

    const { authState, navigate, fetchUserProfile } = useContext(Context);
    const [otp, setOtp] = useState('');

    const [loader, setLoader] = useState(false);

    const onSubmitHandler = async () => {
        try {
            if (authState !== 'authenticated') {
                return navigate('/login');
            }

            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/verify-email-otp', { otp });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchUserProfile();
                navigate('/');
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
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"></div>

            <div className="relative w-full max-w-md">

                {/* Verification Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">

                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-8 ring-blue-50/50">
                            <FiMail size={30} />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                            Verify Your Email
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Please check your inbox. We've sent you a verification code to confirm your email address.
                        </p>
                    </div>

                    {/* OTP Input */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Verification OTP
                        </label>

                        <div className="relative">
                            <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.trim())}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium tracking-widest text-slate-800 outline-none transition-all duration-200 placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                placeholder="Enter verification OTP"
                            />
                        </div>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={() => onSubmitHandler()}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 active:translate-y-0"
                    >
                        Verify Email
                        <FiArrowRight size={18} />
                    </button>

                    {/* Security Note */}
                    <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400">
                        <FiLock size={14} />
                        <span>Your email verification is secure and protected.</span>
                    </div>

                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-400">
                    Email Verification · Account Security
                </p>

            </div>
        </div>
    )
}

export default VerifyEmail
