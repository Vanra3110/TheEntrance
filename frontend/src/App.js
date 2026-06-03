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
import ClickSpark from './components/ClickSpark';
import ProfilePage from './pages/ProfilePage';
import TransitionPage from './pages/TransitionPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CheckoutPage from './pages/CheckoutPage';


function App() {
  return (
    <>
      <ClickSpark
        sparkColor="black"
        sparkSize={15}
        sparkRadius={15}
        sparkCount={8}
        duration={600}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/contacts" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/transition' element={<TransitionPage />} />
          <Route path='/admin-dashboard' element={<AdminDashboardPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      </ClickSpark>
    </>
  );
}

export default App;
