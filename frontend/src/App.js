import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Loginpage';
import Signup from './pages/SignupPage';
import ForgetPass from './pages/ForgetPassPage';
import Home from './pages/HomePage';
import ContactUs from './pages/ContactUs';
import DetailsPage from './pages/DetailsPage';
import ScrollToTop from './components/ScrollToTop';
import Products from './pages/ProductsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/contacts" element={<ContactUs />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
