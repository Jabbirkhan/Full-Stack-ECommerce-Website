import React, { useContext, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageCircle,
  FiShoppingBag,
  FiArrowUpRight,
  FiHelpCircle,
  FiPackage,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Context } from "../context/Context.jsx";

const Contact = () => {

  const { authState, navigate } = useContext(Context);

  const [name, setName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const sendContactMessage = async (e) => {
    e.preventDefault();
    try {
      if (authState !== 'authenticated') {
        return navigate('/login');
      }

      setLoader(true);
      const response = await axiosInstance.post(`/api/v1/user/send-contact-message`, { name, orderNumber, subject, message });
      if (response.data.success) {
        toast.success(response.data.message);
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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 mb-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
            <FiMessageCircle className="text-blue-400" />
            We're here to help
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let's talk about
                <span className="block text-blue-400">your next order.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                Have a question about a product, your order, or a return?
                Our friendly support team is ready to help you find the
                answers you need.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <FiClock className="text-blue-400" />
                Customer support hours
              </div>
              <p className="mt-4 text-lg font-semibold text-white">
                Monday – Saturday
              </p>
              <p className="mt-1 text-sm text-slate-400">
                9:00 AM – 6:00 PM
              </p>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-slate-400">
                We usually respond within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-600">
              <FiMail />
            </div>
            <h2 className="text-lg font-semibold">Email us</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Send us your questions and we’ll get back to you.
            </p>
            <a
              href="mailto:support@example.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              support@example.com <FiArrowUpRight />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-xl text-indigo-600">
              <FiPhone />
            </div>
            <h2 className="text-lg font-semibold">Call us</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Speak directly with our customer support team.
            </p>
            <a
              href="tel:+12345678900"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              +1 (234) 567-8900 <FiArrowUpRight />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-600">
              <FiMapPin />
            </div>
            <h2 className="text-lg font-semibold">Visit us</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find our store and come say hello.
            </p>
            <p className="mt-5 text-sm font-semibold text-slate-700">
              123 Market Street, Your City
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        {/* Contact form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="mb-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-xl text-blue-600">
              <FiMessageCircle />
            </span>
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              Send us a message
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Fill out the form below and our team will respond as soon as
              possible.
            </p>
          </div>

          <form onSubmit={sendContactMessage} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-1">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Your first name"
                  onChange={(e) => setName(e.target.value)} value={name}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="orderNumber" className="mb-2 block text-sm font-medium text-slate-700">
                Order number <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="orderNumber"
                name="orderNumber"
                type="text"
                onChange={(e) => setOrderNumber(e.target.value)} value={orderNumber}
                placeholder="e.g. ORD-10025"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                defaultValue=""
                required
                onChange={(e) => setSubject(e.target.value)} value={subject}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option value="order">Order status</option>
                <option value="shipping">Shipping and delivery</option>
                <option value="return">Returns and refunds</option>
                <option value="product">Product question</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us how we can help..."
                required
                onChange={(e) => setMessage(e.target.value)} value={message}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:w-auto"
            >
              Send message <FiArrowUpRight />
            </button>

            <p className="text-xs leading-5 text-slate-400">
              By submitting this form, you agree to our Privacy Policy.
            </p>
          </form>
        </section>

        {/* Help and support */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold">How can we help?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Choose the topic that best matches your question.
            </p>

            <div className="mt-6 space-y-4">
              <a
                href="/orders"
                className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-lg text-blue-600">
                  <FiPackage />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-slate-800">
                    Order tracking
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-500">
                    Check your order status and delivery progress.
                  </span>
                </span>
                <FiArrowUpRight className="mt-1 text-slate-400 transition group-hover:text-blue-600" />
              </a>

              <a
                href="/returns"
                className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600/10 text-lg text-indigo-600">
                  <FiRefreshCw />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-slate-800">
                    Returns & refunds
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-500">
                    Learn about return eligibility and refund timelines.
                  </span>
                </span>
                <FiArrowUpRight className="mt-1 text-slate-400 transition group-hover:text-blue-600" />
              </a>

              <a
                href="/faq"
                className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-lg text-blue-600">
                  <FiHelpCircle />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold text-slate-800">
                    Frequently asked questions
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-500">
                    Find quick answers to common questions.
                  </span>
                </span>
                <FiArrowUpRight className="mt-1 text-slate-400 transition group-hover:text-blue-600" />
              </a>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-xl text-blue-400">
              <FiShield />
            </div>
            <h2 className="mt-5 text-xl font-bold">Your information is safe</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              We respect your privacy. Information submitted through this page
              is used to respond to your inquiry and provide customer support.
            </p>
            <a
              href="/privacy-policy"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Read our Privacy Policy <FiArrowUpRight />
            </a>
          </section>
        </div>
      </main>

    </div>
  );
};

export default Contact;