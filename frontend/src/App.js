import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Loginpage';
import Signup from './pages/SignupPage';
import ForgetPass from './pages/ForgetPassPage';
import Home from './pages/HomePage';
import ContactUs from './pages/ContactUs';
import DetailsPage from './pages/DetailsPage';
import ScrollToTop from './components/ScrollToTop';

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
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/contacts" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
