import React, { useState } from 'react';
import axios from 'axios';

const SocialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/social', formData);
      setMessage('✅ Form submitted successfully!');
      setMessageType('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        github: '',
        linkedin: '',
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || '❌ Submission failed';
      setMessage(errorMsg);
      setMessageType('error');
    }
  };

  return (
    <div className='bg-white'> 
    <div className="max-w-2xl mx-auto  p-6 bg-[#2A9BCE]  mb-6 mt-3  text-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold text-black mb-6 text-center">Social Media Form</h2>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="text-black  grid grid-cols-1 gap-4">
        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <InputField label="GitHub" name="github" value={formData.github} onChange={handleChange} />
        <InputField label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        <InputField label="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
        <InputField label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
        <InputField label="Twitter" name="twitter" value={formData.twitter} onChange={handleChange} />
        <InputField label="YouTube" name="youtube" value={formData.youtube} onChange={handleChange} />

        <button
          type="submit"
          className="bg-black text-white font-semibold py-2 px-4 rounded  transition"
        >
          Submit
        </button>
      </form>
    </div> </div>
   
  );
};


const InputField = ({ label, name, type = 'text', value, onChange, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-black  mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
 
);

export default SocialForm;
