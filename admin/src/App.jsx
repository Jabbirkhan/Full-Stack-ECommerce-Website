import { useContext, lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Context } from './context/Context';
import Loader from './components/Loader';
import Navbar from "./components/Navbar";
import Login from './pages/Login';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from "./components/ErrorBoundary";

const AddProduct = lazy(() => import('./pages/AddProduct'));
const ProductsList = lazy(() => import('./pages/ProductsList'));
const OrdersList = lazy(() => import('./pages/OrdersList'));
const UpdateProduct = lazy(() => import('./pages/UpdateProduct'));
const ForgetPassword = lazy(() => import('./pages/forgetPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {

  const { authState } = useContext(Context);
  const location = useLocation();

  if (authState === 'checking') {
    return <Loader />
  }

  if (authState === 'unauthenticated' && location.pathname !== '/login' && location.pathname !== '/forget-password') {
    return <Navigate to='/login' replace />
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => window.location.reload()}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<AddProduct />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/updateproduct/:id' element={<UpdateProduct />} />
            <Route path='/orders' element={<OrdersList />} />
            <Route path='/login' element={authState === 'unauthenticated' ? <Login /> : <Navigate to='/' replace />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
