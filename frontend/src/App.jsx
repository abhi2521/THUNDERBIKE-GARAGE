import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Event from './pages/event.jsx';
import Sponsor from './pages/sponsor.jsx';
import Navbar from './pages/navbar.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import User from './pages/user.jsx';
import Service from './pages/service.jsx';
import Records from './pages/records.jsx';
import Footer from './pages/footer.jsx';
import Customer from './pages/customer.jsx';
import Contact from './pages/contact.jsx';
import Wishlist from './pages/Wishlist';
import BikeDetail from './pages/BikeDetail';
import EditBike from './pages/EditBike';
import Tc from './pages/tc.jsx';
import PP from './pages/pp.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Social from './pages/social.jsx';
function App() {
  
  return (
    
    <Router>

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer" element={<Customer/>} />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />} />
        <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={<User/>} />
         <Route path="/bike/:id" element={<BikeDetail />} />
         <Route path="/edit/:id" element={<EditBike />} />
        <Route path="/records" element={<Records/>} />
        <Route path="/service" element={<Service/>} />
         <Route path="/tc" element={<Tc/>} />
         <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/pp" element={<PP/>} />
          <Route path='social' element={<Social/>} />
        <Route path="/sponsor" element={<Sponsor />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;