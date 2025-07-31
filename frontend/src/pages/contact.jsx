import { useState } from 'react';
import axios from 'axios';
import con from "../assets/contact1.png";
// import Navbar from './navbar.jsx';
// import Footer from './footer.jsx';
// import Rich from './rich.jsx';

function Contact() {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    if (["firstName", "lastName"].includes(name)) {
      validatedValue = value.replace(/[^A-Za-z ]/g, '');
    }
    if (name === 'phone') {
      validatedValue = value.replace(/[^0-9]/g, '');
    }
    if (name === 'email') {
      validatedValue = value.replace(/[^a-zA-Z0-9@._-]/g, '');
    }

    setFormData({ ...formData, [name]: validatedValue });
    setFormErrors({ ...formErrors, [name]: '' });
    setSuccess('');
    setError('');
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;
    const { firstName, lastName, email, phone, message } = formData;

    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    if (!phone.trim()) {
      errors.phone = "Phone Number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone must be 10 digits";
      isValid = false;
    }
    if (!message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/service-contact', formData);
      setSuccess(res.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setTimeout(() => setError(''), 4000);
    }
  };

  return (
    <>
  
      {/* <Navbar /> */}
      {/* Banner */}
      <div className='bg-[#151E30]'>
      <section className="relative w-full text-center">
        <img src={con} alt="banner" className="w-full h-auto block" />
        {/* <h1 className="absolute bottom-44 left-1/2 transform -translate-x-1/2 text-4xl text-white drop-shadow-lg font-bold">
          Book Your Bike Service
        </h1> */}
      </section>

      {/* Contact Details */}
      <section className="text-center py-10 px-4 md:px-16">
        <p className="text-white text-xl mb-8">We're here to help you with bike servicing, maintenance, and booking inquiries.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white/80 p-6  text-lg  rounded-lg shadow-md w-75 ">
            <h3 className="text-black font-semibold mb-1">Email Garage</h3>
            <p className="text-black">service@thunderbikegarage.com</p>
          </div>
          <div className="bg-white/80 text-lg p-6 rounded-lg shadow-md w-75 ">
            <h3 className="text-black font-semibold mb-1">Call Garage</h3>
            <p className="text-black">+91 98765 43210</p>
          </div>
          <div className="bg-white/80 text-lg p-6 rounded-lg shadow-md w-75">
            <h3 className="text-black font-semibold mb-1">Visit Our Workshop</h3>
            <p className="text-black">No. 42, Chain Street, Race Course Road, Madurai – 625002.</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="flex justify-center px-4 pb-16">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white/10 backdrop-blur-md p-8 rounded-lg max-w-3xl w-full shadow-lg space-y-4 text-white"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="p-2 rounded border border-orange-500 bg-transparent text-white placeholder-white/60"
              />
              {formErrors.firstName && <span className="text-red-400 text-sm mt-1">{formErrors.firstName}</span>}
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="p-2 rounded border border-orange-500 bg-transparent text-white placeholder-white/60"
              />
              {formErrors.lastName && <span className="text-red-400 text-sm mt-1">{formErrors.lastName}</span>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-2 rounded border border-orange-500 bg-transparent text-white placeholder-white/60"
              />
              {formErrors.email && <span className="text-red-400 text-sm mt-1">{formErrors.email}</span>}
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                maxLength="10"
                className="p-2 rounded border border-orange-500 bg-transparent text-white placeholder-white/60"
              />
              {formErrors.phone && <span className="text-red-400 text-sm mt-1">{formErrors.phone}</span>}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what service you need..."
              className="p-2 rounded border border-orange-500 bg-transparent text-white placeholder-white/60 resize-y"
            ></textarea>
            {formErrors.message && <span className="text-red-400 text-sm mt-1">{formErrors.message}</span>}
          </div>

          {/* <div className="my-4">
            <Rich />
          </div> */}

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500/70 hover:bg-gray-700 text-white px-16 py-2 rounded transition duration-300"
            >
              Book Now
            </button>
          </div>
        </form>
      </section>

      {/* Popup Notifications */}
      {success && (
        <div className="fixed top-6 right-6 max-w-xs bg-green-100 text-green-800 border-l-4 border-green-500 p-4 rounded shadow animate-fade">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed top-6 right-6 max-w-xs bg-red-100 text-red-800 border-l-4 border-red-500 p-4 rounded shadow animate-fade">
          {error}
        </div>
      )}
</div>
      {/* <Footer /> */}
    </>
  );
}

export default Contact;
