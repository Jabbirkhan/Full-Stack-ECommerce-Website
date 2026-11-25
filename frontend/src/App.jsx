import { useContext, lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Context } from './context/Context';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Orders = lazy(() => import('./pages/Orders'));
const About = lazy(() => import('./pages/About'));
const Checkout = lazy(() => import('./pages/Checkout'));
const VerifyEmail = lazy(() => import('./pages/verifyEmail'));
const ForgetPassword = lazy(() => import('./pages/forgetPassword'));
const Verify = lazy(() => import('./pages/Verify'));
const Contact = lazy(() => import('./pages/contact'));
const PrivacyPolicy = lazy(() => import('./pages/privacyPolicy'));
const TermsOfService = lazy(() => import('./pages/termsOfService'));
const NotFound = lazy(() => import('./pages/NotFound'));


const App = () => {

  const { authState } = useContext(Context);
  const location = useLocation();

  if (authState === 'checking') {
    return <Loader />
  }

  if (authState === 'unauthenticated' && location.pathname !== '/login' && location.pathname !== '/forget-password' && location.pathname !== '/privacy-policy' && location.pathname !== '/terms-of-service') {
    return <Navigate to='/login' replace />
  }

  return (
    <section>
      <Navbar />
      <SearchBar />
      <ToastContainer />
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => window.location.reload()}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/productdetail/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/login' element={authState === 'unauthenticated' ? <Login /> : <Navigate to='/' replace />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </section>
  )
}

export default App
