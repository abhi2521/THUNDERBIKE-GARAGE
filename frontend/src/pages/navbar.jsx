import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../assets/LOGO.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Moved inside component

  return (
    <section className="bg-[#10182B] w-full py-8">
      <div className="container mx-auto px-7">
        <nav className="flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-12 relative">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center"
          >
            <img src={logo} alt="Thunderbike Logo" className="h-10 w-auto" />
          </NavLink>

          {/* Hamburger */}
          <div
            className="text-white text-3xl cursor-pointer lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>

          {/* Menu */}
          <div
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } lg:flex flex-col lg:flex-row items-end lg:items-center absolute lg:static bg-[#0c204a] lg:bg-transparent top-full right-0 w-full lg:w-auto z-50 px-6 py-4 lg:p-0 gap-6 lg:gap-8`}
          >
            <div className="flex flex-col align-justify lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto items-end lg:items-center justify-end lg:justify-start text-right lg:text-left">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/event', label: 'Event' },
                { to: '/user', label: 'Users' },
                { to: '/service', label: 'Service' },
                { to: '/records', label: 'Records' },
                { to: '/sponsor', label: 'Sponsor' },
                { to: '/customer', label: 'Customer' },
                { to: '/wishlist', label: 'Wishlist' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-white font-semibold ${
                      isActive ? 'text-cyan-400 border-b-2 border-[#8699a0]' : ''
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
              <Button
                type="primary"
                className="w-full md:w-auto"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/login');
                }}
              >
                Sign In
              </Button>
              <Button
                type="default"
                ghost
                className="w-full md:w-auto border-white text-white"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/signup');
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
