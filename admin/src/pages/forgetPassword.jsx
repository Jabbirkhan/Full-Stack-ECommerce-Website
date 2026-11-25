import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { FiMail, FiShield, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Context } from '../context/Context.jsx';
import axiosInstance from '../utils/axiosInstance.js';
import Loader from '../components/Loader.jsx';

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
            const response = await axiosInstance.post('/api/v1/admin/send-reset-password-otp', { email });
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
            const response = await axiosInstance.post('/api/v1/admin/verify-reset-password-otp', { email, otp });
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
            const response = await axiosInstance.post('/api/v1/admin/reset-password', { email, otp, newPassword });
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
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#090e1a] px-4 py-10">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]"></div>
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]"></div>

            <div className="relative w-full max-w-lg">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/5">
                        <FiLock size={30} />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Reset Your Password
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Follow the steps below to securely recover your account.
                    </p>
                </div>

                {/* Main Card */}
                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

                    {/* Progress Indicator */}
                    <div className="mb-10 flex items-center">

                        <div className="flex shrink-0 flex-col items-center gap-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                                step >= 1
                                    ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'border-slate-600 bg-slate-800 text-slate-500'
                            }`}>
                                {step > 1 ? <FiCheckCircle size={19} /> : '01'}
                            </div>
                            <span className={`text-xs font-medium ${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                                Email
                            </span>
                        </div>

                        <div className={`mx-3 mb-6 h-1 flex-1 rounded-full transition-all duration-300 ${
                            step >= 2 ? 'bg-blue-500' : 'bg-slate-700'
                        }`}></div>

                        <div className="flex shrink-0 flex-col items-center gap-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                                step >= 2
                                    ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'border-slate-600 bg-slate-800 text-slate-500'
                            }`}>
                                {step > 2 ? <FiCheckCircle size={19} /> : '02'}
                            </div>
                            <span className={`text-xs font-medium ${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>
                                Verification
                            </span>
                        </div>

                        <div className={`mx-3 mb-6 h-1 flex-1 rounded-full transition-all duration-300 ${
                            step >= 3 ? 'bg-blue-500' : 'bg-slate-700'
                        }`}></div>

                        <div className="flex shrink-0 flex-col items-center gap-2">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                                step >= 3
                                    ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'border-slate-600 bg-slate-800 text-slate-500'
                            }`}>
                                03
                            </div>
                            <span className={`text-xs font-medium ${step >= 3 ? 'text-blue-400' : 'text-slate-500'}`}>
                                New Password
                            </span>
                        </div>

                    </div>

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <FiMail className="text-blue-400" size={19} />
                                    <h2 className="text-lg font-semibold text-white">
                                        Enter Your Email
                                    </h2>
                                </div>

                                <p className="text-sm leading-6 text-slate-400">
                                    Enter the email address you used to register. We'll send you a password reset OTP.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                    value={email}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <button
                                onClick={() => sendResetOtp()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/20 active:translate-y-0"
                            >
                                Send Verification Email
                                <FiArrowRight size={18} />
                            </button>

                        </div>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <FiShield className="text-blue-400" size={19} />
                                    <h2 className="text-lg font-semibold text-white">
                                        Verify Your Email
                                    </h2>
                                </div>

                                <p className="text-sm leading-6 text-slate-400">
                                    Enter the verification OTP sent to your registered email address.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Verification OTP
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => setOtp(e.target.value.trim())}
                                    value={otp}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-center text-lg font-semibold tracking-[0.4em] text-white outline-none transition-all duration-200 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-500 hover:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    placeholder="Enter OTP"
                                />
                            </div>

                            <button
                                onClick={() => verifyResetOtp()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/20 active:translate-y-0"
                            >
                                Verify OTP
                                <FiArrowRight size={18} />
                            </button>

                        </div>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <FiLock className="text-blue-400" size={19} />
                                    <h2 className="text-lg font-semibold text-white">
                                        Create New Password
                                    </h2>
                                </div>

                                <p className="text-sm leading-6 text-slate-400">
                                    Enter your new password below to regain access to your admin account.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    New Password
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => setNewPassword(e.target.value.trim())}
                                    value={newPassword}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <button
                                onClick={() => resetPassword()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/20 active:translate-y-0"
                            >
                                Reset Password
                                <FiArrowRight size={18} />
                            </button>

                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <FiShield size={14} />
                    <span>Your account security is our priority.</span>
                </div>

            </div>
        </div>
    )
}

export default ForgetPassword
