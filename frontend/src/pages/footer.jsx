import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";



function Footer() {
  
  const [links, setLinks] = useState({});
  
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/social') // Adjust if your route differs
        const data = await res.json();

        if (data.length > 0) {
          // Use latest submitted record
          setLinks(data[0]);
        }
      } catch (err) {
        console.error('Failed to load social links:', err);
      }
    };

    fetchLinks();
  }, []);
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSend = () => {
    if (email.trim() !== "") {
      setShowPopup(true);
      setEmail("");
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <footer className="bg-black text-gray-300 px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Contact Info */}
        <div>
          <h3 className="text-blue-400 font-semibold text-sm mb-2">🏍️ THUNDERBIKE GARAGE</h3>
          <p className="text-sm">No. 42, Chain Street, Race Course Road, Madurai – 625002.</p>
          <p className="text-sm">s@thunderbike.com</p>
          <p className="text-sm"> +91 98765 43210</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-blue-400 mb-2">Navigation</h4>
          <ul className="space-y-1 text-sm">
            {[
              ["/", " Home"],
              ["/about", "About"],
              ["/Event", " Events"],
              ["/user", "Users"],
              ["/service", "Service"],
              ["/records", "Records"],
              ["/customer", " Customer"],
              ["/sponsor", "Sponsorship"],
              ["/pp", " Privacy Policy"],
              ["/tc", "Terms & Conditions"],
            ].map(([to, name]) => (
              <li key={name}>
                <Link to={to} className="hover:text-white">{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-blue-400 mb-2">Services</h4>
          <ul className="space-y-1 text-sm">
            <li>Chain Lubrication</li>
            <li>Battery Checkup</li>
            <li>Water Washing</li>
            <li>Engine Tuning</li>
            <li>Brake Service</li>
            <li>Tyre Rotation</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-blue-400 mb-2">Our Products</h4>
          <ul className="space-y-1 text-sm">
            <li>Bike ECU</li>
            <li>Chain Lube</li>
            <li>Helmet Lock</li>
            <li>LED Fog Lamp</li>
            <li>Tyre Inflator</li>
          </ul>
        </div>

        {/* Newsletter + Social Media Icons */}
        <div className="col-span-2 xl:col-span-1">
          <h4 className="text-blue-400 mb-2">Join a Newsletter</h4>
          <label className="text-sm">Your Email</label>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="px-3 py-2 rounded bg-gray-100 text-black text-sm focus:outline-none flex-1"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Send
            </button>
          </div>

          {/* Social Media Icons Below Newsletter */}
        <div className="mt-6">
      <h4 className="text-blue-400 mb-2">🔗 Follow Us</h4>
      <div className="flex flex-wrap gap-4 text-xl text-white">
        {links.github && (
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="GitHub">
            <FaGithub />
          </a>
        )}
        {links.linkedin && (
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="LinkedIn">
            <FaLinkedin />
          </a>
        )}
        {links.facebook && (
          <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="Facebook">
            <FaFacebook />
          </a>
        )}
        {links.instagram && (
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="Instagram">
            <FaInstagram />
          </a>
        )}
        {links.twitter && (
          <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="Twitter">
            <FaTwitter />
          </a>
        )}
        {links.youtube && (
          <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="YouTube">
            <FaYoutube />
          </a>
        )}
      </div>
    </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 border-t border-gray-700 mt-10 pt-4">
        © {new Date().getFullYear()} THUNDERBIKE GARAGE
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-10 right-4 bg-green-400 text-black px-4 py-2 rounded shadow-md text-sm font-semibold z-50">
          ✅ Email sent successfully!
        </div>
      )}
    </footer>
  );
}

export default Footer;
