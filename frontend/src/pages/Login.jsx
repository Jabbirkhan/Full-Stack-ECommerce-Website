import { useState, useContext } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Context } from '../context/Context'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosInstance.js'
import Loader from '../components/Loader.jsx'
import { Link } from 'react-router-dom';

const Login = () => {

  const { setAuthState, navigate, backendUrl } = useContext(Context)

  const [state, setState] = useState("Login")
  const [showPassword, setShowPassword] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loader, setLoader] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === "Sign Up") {

        if (!privacyChecked) {
          toast.error("Please agree to the Privacy Policy and Terms of Service");
          return;
        }

        setLoader(true)

        const payload = {
          name,
          email,
          password,
        }

        const response = await axiosInstance.post(`/api/v1/user/register`, payload)

        if (response.data.success) {
          toast.success(response.data.message)
          setState("Login")
        }

      } else {

        setLoader(true)

        const response = await axiosInstance.post(`/api/v1/user/login`, { email, password })

        if (response.data.success) {
          toast.success(response.data.message)
          setAuthState('authenticated')
          navigate('/')
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      setLoader(false)
    }
  }

  const googleAuth = () => {
    window.location.href = `${backendUrl}/api/v1/user/google`
  }

  const githubAuth = () => {
    window.location.href = `${backendUrl}/api/v1/user/github`
  }

  if (loader) {
    return <Loader />
  }

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-5xl min-h-[620px] bg-white rounded-2xl shadow-xl overflow-hidden flex">

        {/* Left Side */}

        <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden">

          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-600/20" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-indigo-600/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/5" />

          <div className="relative z-10 flex flex-col justify-between w-full p-12 text-white">

            {/* Brand */}

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  YourPlatform
                </h1>
                <p className="text-xs text-slate-400">
                  Simple. Secure. Reliable.
                </p>
              </div>

            </div>


            {/* Main Content */}

            <div className="max-w-md">

              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Welcome
              </p>

              <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                Everything you need, all in one place.
              </h2>

              <p className="text-slate-400 leading-relaxed mb-8">
                Create your account or sign in to continue using
                our platform and access all of your personalized
                features.
              </p>


              <div className="space-y-4">

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <ShieldCheck className="text-blue-400" size={18} />
                  Secure account authentication
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <ShieldCheck className="text-blue-400" size={18} />
                  Fast and easy access
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <ShieldCheck className="text-blue-400" size={18} />
                  Your data stays protected
                </div>

              </div>

            </div>


            {/* Footer */}

            <p className="text-xs text-slate-500">
              Secure access to your account
            </p>

          </div>

        </div>


        {/* Right Side */}

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12">

          <div className="w-full max-w-md">

            {/* Mobile Brand */}

            <div className="lg:hidden flex items-center gap-3 mb-8">

              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  YourPlatform
                </h1>

                <p className="text-xs text-slate-500">
                  Simple. Secure. Reliable.
                </p>
              </div>

            </div>


            {/* Header */}

            <div className="mb-7">

              <p className="text-sm font-semibold text-blue-600 mb-2">
                {state === "Login" ? "Welcome back" : "Get started"}
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                {state === "Login" ? "Sign in to your account" : "Create your account"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {state === "Login"
                  ? "Enter your details to access your account."
                  : "Create an account to get started with our platform."}
              </p>

            </div>


            {/* Social Login */}

            {state === "Login" && (

              <div className="space-y-3 mb-6">

                <button
                  type="button"
                  onClick={googleAuth}
                  className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
                >
                  <FaGoogle className="text-red-500" size={17} />
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={githubAuth}
                  className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 transition cursor-pointer"
                >
                  <FaGithub size={18} />
                  Continue with GitHub
                </button>

              </div>

            )}


            {/* Divider */}

            {state === "Login" && (

              <div className="flex items-center gap-4 mb-6">

                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs text-slate-400 uppercase tracking-wide">
                  Or continue with email
                </span>

                <div className="h-px flex-1 bg-slate-200" />

              </div>

            )}


            {/* Form */}

            <form onSubmit={onSubmitHandler} className="w-full flex flex-col gap-5">

              {/* Name */}

              {state === "Sign Up" && (

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>

                  <div className="relative">

                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />

                  </div>

                </div>

              )}


              {/* Email */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />

                </div>

              </div>


              {/* Password */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  {state === "Login" && (

                    <button
                      type="button"
                      onClick={() => navigate('/forget-password')}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition cursor-pointer"
                    >
                      Forgot password?
                    </button>

                  )}

                </div>


                <div className="relative">

                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                </div>

              </div>

              {state === 'Sign Up' &&  <div>
                <input
                  type="checkbox"
                  id="privacy-terms"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="privacy-terms" className="text-sm text-gray-600">
                  I agree to the
                  <Link to='/privacy-policy' className="text-blue-600 px-1 hover:underline">
                    Privacy Policy
                  </Link>
                  and
                  <Link to='/terms-of-service' className="text-blue-600 px-1 hover:underline">
                    Terms of Service
                  </Link>
                </label>
              </div>}

              {/* Submit Button */}

              <button
                type="submit"
                className="group w-full mt-1 py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >

                {state === "Login" ? "Sign In" : "Create Account"}

                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />

              </button>


              {/* Switch Login / Signup */}

              <div className="text-center pt-1">

                {state === "Login" ? (

                  <p className="text-sm text-slate-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setState("Sign Up")}
                      className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition cursor-pointer"
                    >
                      Create account
                    </button>
                  </p>

                ) : (

                  <p className="text-sm text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setState("Login")}
                      className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>

                )}

              </div>

            </form>


            {/* Security Footer */}

            <div className="mt-8 pt-5 border-t border-slate-100">

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} className="text-blue-500" />
                <span>Your account information is securely protected.</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login