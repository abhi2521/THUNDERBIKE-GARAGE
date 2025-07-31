import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import tc from '../assets/tc.png'; // optional image


const sections = [
  {
    title: '1.User Eligibility & Conduct',
    points: [
      "You must be 18 years or older to register or make a booking...",
      "Ensure all the information you provide is truthful...",
      "Do not misuse or manipulate the booking...",
      "Unauthorized advertising, reselling...",
      "Respect our platform rules while leaving reviews...",
    ],
  },
  {
    title: '2.Booking and Cancellation',
    points: [
      "All bookings must include verified ID and contact details...",
      "Booking charges, if applicable, are clearly stated...",
      "Each booking is bound by specific cancellation timelines...",
      "Repeated cancellations, no-shows...",
      "The company reserves full rights to cancel...",
    ],
  },
  {
    title: '3.Intellectual Property Rights',
    points: [
      "All visual content like bike photos, videos...",
      "You cannot reproduce, copy, or distribute site materials...",
      "Using our logo, color palette, UI patterns...",
      "Blog posts, articles, and specifications listed...",
      "We will take strict legal action for any intellectual property violation...",
    ],
  },
  {
    title: '4.Privacy & Data Protection',
    points: [
      "Your personal data is stored securely using encryption...",
      "All forms on the platform are protected and used solely...",
      "You may opt to delete your data or account...",
      "Your browsing and click behavior may be recorded anonymously...",
      "Strict access control ensures only authorized support staff...",
    ],
  },
  {
    title: '5.Liability & Disclaimer',
    points: [
      "We do not take responsibility for user errors...",
      "In the case of test rides or event entries...",
      "Bike listings, specifications, and availability are dynamic...",
      "We are not liable for third-party service errors...",
      "By using this platform, you agree to our terms...",
    ],
  },
];

function Tc() {
  return (
    <>
      {/* <Navbar /> */}

      {/* Banner */}
      <section className="relative w-full h-[280px] md:h-[200px] bg-gradient-to-r from-[#012b46] to-[#8b0000] flex justify-center items-center">
        <img src={tc} alt="banner" className="hidden" />
        <h1 className="text-white text-3xl md:text-2xl font-bold text-center z-10">Terms & Conditions</h1>
      </section>

      {/* Terms Content */}
      <div className="bg-[#0f0f0f] text-white px-4 py-12 md:px-8 lg:px-20 font-[Segoe UI]">
        {sections.map((section, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl md:text-xl font-semibold border-l-4 border-[#2ecc71] pl-4 mb-6 ml-0 md:ml-28">
              {section.title}
            </h2>
            <ul className="max-w-5xl mx-auto space-y-5">
              {section.points.map((point, idx) => (
                <li key={idx} className="flex gap-3 items-start text-justify text-gray-300 text-base md:text-sm">
                  <FaCheckCircle className="text-[#2ecc71] mt-1 shrink-0 text-lg md:text-base" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Tc;
