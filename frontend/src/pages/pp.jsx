import React from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import pri from '../assets/pri.png';

const sections = [
  {
    id: 'info',
    title: '1. Information We Collect',
    content: `We collect personal information when you register, book an event, or fill out contact/inquiry forms on our platform. 
    This includes your full name, email address, phone number, ID details (if needed), booking preferences, and any messages you send us. 
    We may also collect non-personal technical data such as browser type, device information, and user interaction patterns to improve our services. 
    All collected data is stored securely and used strictly for operational purposes such as booking verification and user communication.`
  },
  {
    id: 'use',
    title: '2. How We Use Your Information',
    content: `We use your data to confirm and manage bookings, send notifications or updates, respond to customer support, and prevent fraud or misuse. 
    We do not sell or rent your personal data to third-party marketers.`
  },
  {
    id: 'security',
    title: '3. Data Storage & Security',
    content: `All personal data is stored using advanced encryption and strict access control. Only authorized staff can view user data, and we run regular security audits. 
    Sensitive info like ID proof is not retained beyond verification purposes.`
  },
  {
    id: 'cookies',
    title: '4. Cookies & Analytics',
    content: `We use cookies to enhance site performance and analyze user interaction (like page visits, clicks). 
    This data is anonymous. You may control cookies via browser settings.`
  },
  {
    id: 'rights',
    title: '5. Data Deletion & User Rights',
    content: `You have full control over your data. You can request account/data deletion, which we process within 7 working days. 
    You can unsubscribe from marketing emails or messages anytime.`
  },
  {
    id: 'thirdparty',
    title: '6. Third-Party Services & Links',
    content: `We may link to third-party providers (e.g., payment, maps, event partners). While we verify their reliability, 
    we are not responsible for their privacy terms. Please review their policies separately.`
  },
  {
    id: 'safety',
    title: '7. Safety & Disclaimer',
    content: `Please verify booking details before confirming. We are not liable for user errors, test ride incidents, or misinterpretation of listing details. 
    All rides and events are at your own risk.`
  },
  {
    id: 'updates',
    title: '8. Policy Updates',
    content: `We may update this policy from time to time. We encourage you to check this page regularly to stay informed. 
    Continued usage after changes means you agree to the updated policy.`
  },
  {
    id: 'contact',
    title: '9. Contact Us',
    content: `If you have questions about this policy or your personal data, please contact us: 
    Email: s@thunderbike.com | Phone: +91 98765 43210`
  }
];

function Privacy() {
  return (
    <>
      {/* <Navbar /> */}

      <section className="relative w-full h-[280px] flex items-center justify-center overflow-hidden bg-black md:h-[220px] sm:h-[180px]">
        <img
          src={pri}
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <h1 className="relative z-10 text-white text-3xl md:text-2xl sm:text-xl font-bold text-center px-4">
          Privacy Policy
        </h1>
      </section>

      <div className="bg-[#0e1628] text-white py-10 px-5 sm:py-8 sm:px-4">
        <div className="max-w-5xl mx-auto">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="mb-10 sm:mb-8">
              <h2 className="text-[22px] sm:text-[20px] font-semibold mb-3 pl-3 border-l-4 border-yellow-400">
                {section.title}
              </h2>
              <p className="text-[16px] sm:text-[15px] leading-relaxed text-gray-300 text-justify pl-3 whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Privacy;
