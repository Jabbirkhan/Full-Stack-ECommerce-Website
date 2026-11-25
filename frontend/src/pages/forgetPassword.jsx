import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context/Context';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/Loader.jsx';
import {
    FiMail,
    FiShield,
    FiLock,
    FiArrowRight,
    FiCheckCircle
} from 'react-icons/fi';

const ForgetPassword = () => {

    const { navigate } = useContext(Context);

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loader, setLoader] = useState(false);

    const sendResetOtp = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/send-reset-password-otp', {email});
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(2);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const verifyResetOtp = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/verify-reset-password-otp', { email, otp });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(3);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const resetPassword = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/reset-password', { email, otp, newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
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
        <div className='relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6'>

            {/* Background Decorations */}
            <div className='absolute -top-32 -left-32 w-96 h-96 bg-blue-200/50 rounded-full blur-[120px] pointer-events-none'></div>
            <div className='absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-200/50 rounded-full blur-[120px] pointer-events-none'></div>

            <div className='relative w-full max-w-md'>

                {/* Heading */}
                <div className='text-center mb-8'>
                    <div className='w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-blue-100 border border-blue-200 shadow-lg shadow-blue-100 mb-5'>
                        <FiLock className='text-blue-600 text-2xl' />
                    </div>

                    <h1 className='text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight'>
                        Reset Password
                    </h1>

                    <p className='text-slate-500 text-sm mt-3 leading-relaxed'>
                        Follow the steps below to securely reset your account password.
                    </p>
                </div>

                {/* Main Card */}
                <div className='bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 p-6 sm:p-8'>

                    {/* Progress Steps */}
                    <div className='flex items-center justify-between mb-9'>

                        <div className='flex flex-col items-center gap-2'>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                                step >= 1
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}>
                                {step > 1 ? <FiCheckCircle size={19} /> : '01'}
                            </div>
                            <span className={`text-xs font-medium ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                                Email
                            </span>
                        </div>

                        <div className={`flex-1 h-[2px] mx-2 mb-6 rounded-full transition-all duration-300 ${
                            step >= 2 ? 'bg-blue-500' : 'bg-slate-200'
                        }`}></div>

                        <div className='flex flex-col items-center gap-2'>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                                step >= 2
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}>
                                {step > 2 ? <FiCheckCircle size={19} /> : '02'}
                            </div>
                            <span className={`text-xs font-medium ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                                Verify
                            </span>
                        </div>

                        <div className={`flex-1 h-[2px] mx-2 mb-6 rounded-full transition-all duration-300 ${
                            step >= 3 ? 'bg-blue-500' : 'bg-slate-200'
                        }`}></div>

                        <div className='flex flex-col items-center gap-2'>
                            <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ${
                                step >= 3
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}>
                                03
                            </div>
                            <span className={`text-xs font-medium ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                                Password
                            </span>
                        </div>

                    </div>

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <div className='flex flex-col gap-5'>
                            <div>
                                <div className='w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 mb-4'>
                                    <FiMail className='text-blue-600 text-xl' />
                                </div>

                                <h2 className='text-xl font-semibold text-slate-900'>
                                    Forgot your password?
                                </h2>

                                <p className='text-sm text-slate-500 mt-2 leading-relaxed'>
                                    Enter the email address associated with your account. We'll send you a verification code.
                                </p>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-slate-700'>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                    value={email}
                                    className='w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                                    placeholder='Enter your email'
                                />
                            </div>

                            <button
                                onClick={() => sendResetOtp()}
                                className='w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all duration-200 cursor-pointer'
                            >
                                Send Verification Code
                                <FiArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <div className='flex flex-col gap-5'>
                            <div>
                                <div className='w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 mb-4'>
                                    <FiShield className='text-indigo-600 text-xl' />
                                </div>

                                <h2 className='text-xl font-semibold text-slate-900'>
                                    Verify your email
                                </h2>

                                <p className='text-sm text-slate-500 mt-2 leading-relaxed'>
                                    Enter the verification code sent to your registered email address.
                                </p>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-slate-700'>
                                    Verification Code
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => setOtp(e.target.value.trim())}
                                    value={otp}
                                    className='w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                                    placeholder='Enter OTP'
                                />
                            </div>

                            <button
                                onClick={() => verifyResetOtp()}
                                className='w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all duration-200 cursor-pointer'
                            >
                                Verify & Continue
                                <FiArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <div className='flex flex-col gap-5'>
                            <div>
                                <div className='w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 mb-4'>
                                    <FiLock className='text-emerald-600 text-xl' />
                                </div>

                                <h2 className='text-xl font-semibold text-slate-900'>
                                    Create new password
                                </h2>

                                <p className='text-sm text-slate-500 mt-2 leading-relaxed'>
                                    Choose a new password for your account to complete the reset process.
                                </p>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-slate-700'>
                                    New Password
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => setNewPassword(e.target.value.trim())}
                                    value={newPassword}
                                    className='w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                                    placeholder='Enter new password'
                                />
                            </div>

                            <button
                                onClick={() => resetPassword()}
                                className='w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all duration-200 cursor-pointer'
                            >
                                Reset Password
                                <FiArrowRight size={18} />
                            </button>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <p className='text-center text-xs text-slate-400 mt-6'>
                    <FiLock className='inline mr-1 mb-0.5' size={12} />
                    Your account security is our priority.
                </p>

            </div>
        </div>
    )
}

export default ForgetPassword;
