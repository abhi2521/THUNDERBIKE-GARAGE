import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  message
} from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { IdentificationIcon, TrophyIcon, SparklesIcon } from '@heroicons/react/24/solid';

const { Option } = Select;

function App() {
  const companies = [
    'ThrottleWorks',
    'ChainRev Garage',
    'GearHead Motors',
    'Torque Riders',
    'RapidWheel Co',
    'NextGen Bikes',
    'CruzeFleet',
    'RideLogic',
    'ThunderAxel',
    'MotoGoal'
  ];

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const res = await fetch('http://localhost:5000/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json();
      if (res.ok) {
        message.success('✅ Message sent!');
        form.resetFields();
      } else {
        message.error(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error('❌ Submit error:', error);
      message.error('❌ Something went wrong. Please try again later.');
    }
  };
  

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 font-sans text-white">
      {/* Header */}
      <div className="text-center py-10 px-4">
        <h2 className="text-3xl font-semibold mb-3">Sponsorship Packages</h2>
        <p className="max-w-xl mx-auto mb-10">
          Choose the perfect partnership level that aligns with your brand goals and budget.
        </p>
        <br /><br />

        <div className="flex flex-wrap justify-center gap-6">
          {/* Bronze Card */}
        <div className="bg-[#EFDD99] text-black p-6 rounded-xl w-72  shadow-white shadow-md text-left relative transition-transform transform hover:scale-108 hover:shadow-sm duration-300">
            <div className="text-2xl text-yellow-700 mb-2">
              <IdentificationIcon className="h-8 w-8 text-yellow-600 mb-2 animate-bounce" />
            </div>
            <h3 className="text-2xl font-semibold mb-1">Bronze</h3>
            <p className="font-bold text-2xl">$2,500 <span className="text-xl">/month</span></p>
            <ul className="text-xl text-gray-800 mt-4 list-disc ml-4 space-y-1">
              <li>Free chain cleaning service once every month</li>
              <li>Water wash and exterior polish</li>
              <li>Included in newsletters</li>
              <li>Monthly report</li> 
              <li>Access to garage network</li>
              <li>Access to garage network</li>
            </ul>
           <button className="bg-black !text-white mt-4 px-4 py-2 rounded w-full cursor-pointer">
  Get Started
</button>
          </div>  
          {/* Silver Card */}
          <div className="bg-gray-200 text-black p-6 rounded-xl w-72   shadow-white shadow-md text-left relative transition-transform transform hover:scale-108 hover:shadow-sm  duration-300">
            <TrophyIcon className="h-8 w-8 text-gray-600 mb-2 animate-bounce" />
            <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-sm px-3 py-1 rounded shadow-md font-semibold tracking-wide">
              ⭐ Most Popular
            </div>
            <div className="text-xl text-yellow-500 mb-2 animate-bounce">
              
            </div>
            <h3 className="text-2xl font-bold mb-2">Silver</h3>
            <p className="font-bold text-2xl mb-1">
              <span className="text-black">$5,000</span>
              <span className="text-xl text-gray-600"> /month</span>
            </p>
            <ul className="text-xl text-gray-800 mt-4 list-disc ml-4 space-y-1">
              <li>Everything in Bronze Plan</li>
            
              <li>Premium wash and polish</li>
              <li>Chain lubrication</li>
              <li>One doorstep service / quarter</li>
              <li>Priority booking</li>
              <li>Bike health check</li>
               <li>Premium wash and polish</li>
              <li>Chain lubrication</li>
              
            </ul>
          <button className="bg-black !text-white mt-4 px-4 py-2 rounded w-full cursor-pointer">
  Get Started
</button>
          </div>

          {/* Gold Card */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black p-6 rounded-xl w-72 shadow-white shadow-sm text-left relative transition-transform transform hover:scale-108 hover:shadow-sm duration-300">
            <div className="text-2xl font-bold mb-2">
           <SparklesIcon className="h-8 w-8 text-white mb-2  animate-bounce" />
           </div>
            <h3 className="text-2xlfont-bold mb-1">Gold</h3>
            <p className="font-bold text-2xl">$10,000 <span className="text-xl">/month</span></p>
            <ul className="text-xl text-gray-900 mt-4 list-disc ml-4 space-y-1">
              <li>Everything in Silver Service</li>
              <li>Paint protection</li>
              <li>Personal service reminders</li>
              <li>Free pickup/drop</li>
              <li>VIP service lane</li>
              <li>Expert consultation</li>
              <li>Everything in Silver Service</li>
              <li>Paint protection</li>
              
            </ul>
           <button className="bg-black !text-white mt-4 px-4 py-2 rounded w-full cursor-pointer">
  Get Started
</button> </div>
        </div>
      </div>

      {/* Trusted Partners */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p className="max-w-xl mx-auto mb-10">
          Join riders and garages who rely on our service solutions.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-12 px-4">
          {companies.map((company, index) => (
            <div key={index} className="bg-[#9A6CCD] text-black p-4 rounded-lg shadow-md">
              <div className="bg-black text-white font-bold text-lg w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                {company.split(' ').map(word => word[0]).join('').toUpperCase()}
              </div>
              <span className="block text-sm font-medium">{company}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#FD8682] text-black rounded-xl py-10 px-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Ready to Join Our Partner Network?</h3>
          <p className="text-sm mb-6">Become part of an exclusive community of brands.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700">Schedule a Consultation</button>
            <button className="border-2 border-indigo-600 bg-white  px-6 py-2 rounded-md font-semibold hover:bg-emerald-500">View Success Stories</button>
          </div>
        </div>
      </section>
<div className="text-center py-10 px-4 bg-[#162135]">
  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
    Let's Start Your Partnership Journey
  </h1>
  <p className="text-white max-w-2xl mx-auto text-base md:text-lg">
    Get in touch with our partnership team and let's discuss your goals.
  </p>
</div>
      {/* Contact Form and Info */}
      <div className="flex flex-col lg:flex-row justify-center gap-10 px-4 py-10">
        <div className="bg-[#E9CA53] text-black rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Let's Start Your Partnership Journey</h2>
      <Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  requiredMark="optional"
>
  {/* First + Last Name Row */}
  <div className="flex flex-col sm:flex-row gap-4">
    <Form.Item
      className="w-full"
      label={<span className="font-bold">First Name</span>}
      name="firstName"
      rules={[{ required: true }]}
    >
      <Input placeholder="Enter your first name" />
    </Form.Item>

    <Form.Item
      className="w-full"
      label={<span className="font-bold">Last Name</span>}
      name="lastName"
      rules={[{ required: true }]}
    >
      <Input placeholder="Enter your last name" />
    </Form.Item>
  </div>

  <Form.Item
    label={<span className="font-bold">Email</span>}
    name="email"
    rules={[{ required: true, type: 'email' }]}
  >
    <Input placeholder="Enter your email address" />
  </Form.Item>

  <Form.Item
    label={<span className="font-bold">Phone</span>}
    name="phone"
    rules={[
      { required: true },
      {
        pattern: /^\d{10}$/,
        message: 'Enter a 10-digit phone number',
      },
    ]}
  >
    <Input placeholder="Enter your phone number" />
  </Form.Item>

  <Form.Item
    label={<span className="font-bold">Company</span>}
    name="company"
    rules={[{ required: true }]}
  >
    <Input placeholder="Your company or brand name" />
  </Form.Item>

  <Form.Item
    label={<span className="font-bold">Sponsorship Interest</span>}
    name="interest"
    rules={[{ required: true }]}
  >
    <Select placeholder="Select a sponsorship tier">
      <Option value="bronze">Bronze</Option>
      <Option value="silver">Silver</Option>
      <Option value="gold">Gold</Option>
    </Select>
  </Form.Item>

  <Form.Item
    label={<span className="font-bold">Message</span>}
    name="message"
    rules={[{ required: true }]}
  >
    <Input.TextArea placeholder="Tell us more about your interest, goals, etc." rows={4} />
  </Form.Item>


  <Button
    type="default"
    htmlType="submit"
    size="large"
    className="!bg-black !text-white font-semibold w-full py-2.5 rounded-lg hover:!bg-gray-800"
  >
    Send Message
  </Button>
</Form>
        </div>

     <div className="flex flex-col gap-4 w-full max-w-75">
  <div className="flex bg-white/90 p-4 rounded-lg shadow">
    <MailOutlined className="text-xl !text-black !fill-black mr-4 mt-1" />
    <div>
      <strong className="block text-black">Email</strong>
      <p className="text-black text-sm">service@thunderbike.com</p>
    </div>
  </div>
  <div className="flex bg-white/90 p-4 rounded-lg shadow">
    <PhoneOutlined className="text-xl !text-black !fill-black mr-4 mt-1" />
    <div>
      <strong className="block text-black">Phone</strong>
      <p className="text-black text-sm">+91 98765 43210</p>
    </div>
  </div>
  <div className="flex bg-white/90 p-4 rounded-lg shadow">
    <EnvironmentOutlined className="text-xl !text-black !fill-black mr-4 mt-1" />
    <div>
      <strong className="block text-black">Garage Location</strong>
      <p className="text-gray-700 text-sm">No. 12, Bike Street, Madurai, TN 625001</p>
    </div>
  </div>
  <div className="flex bg-white/90 p-4 rounded-lg shadow">
    <ClockCircleOutlined className="text-xl !text-black !fill-black mr-4 mt-1" />
    <div>
      <strong className="block text-black">Service Hours</strong>
      <p className="text-gray-700 text-sm">Mon - Sat: 8AM - 8PM<br />Sunday: 10AM - 2PM</p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default App;
