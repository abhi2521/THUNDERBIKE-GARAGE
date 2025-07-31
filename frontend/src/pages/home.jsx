import { Button } from 'antd';
import ai from '../assets/21.png';
import appl from '../assets/22.png';
import digi from '../assets/23.png';
import aii from '../assets/24.png';
import apple from '../assets/25.png';
import digit from '../assets/26.png';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="font-sans">
        {/* Hero Section */}
        <section className="text-center px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 bg-[#10182B] text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] mx-auto">
            Built for speed, comfort, and unstoppable adventure.
          </h1>

          <p className="max-w-2xl mx-auto text-gray-300 mb-8 text-sm sm:text-base md:text-[15px] leading-relaxed px-2">
            Thunderbike Garage is a trusted custom bike solutions provider with a passion for precision
            engineering and performance. With years of expertise in bike design, performance tuning, and on-road
            modifications, we deliver high-powered machines that fuel every rider's journey with style.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            
            <Button
  type="primary"
  className="!bg-blue-600 !text-white !font-bold !px-6 sm:!px-8 !py-3 sm:!py-4 !rounded font-segoe !text-sm sm:!text-base"
  onClick={() => navigate('/login')} // 👈 navigates to login
>
  Sign In
</Button>

<Button
  type="default"
  ghost
  className="!border-white !text-white !font-bold !px-6 sm:!px-8 !py-3 sm:!py-4 !rounded font-segoe !text-sm sm:!text-base"
  onClick={() => navigate('/signup')} // 👈 navigates to signup
>
  Sign Up
</Button>

          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#0c204a] text-white py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-20 font-segoe">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Main Features</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Powerful, road-tested, and performance-focused bike machines.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                img: apple,
                title: 'Custom Bike Engineering',
                desc: 'Design high-performance, road-ready bikes tailored to your style — delivering power, comfort, and unmatched riding experience for every journey.',
              },
              {
                img: digit,
                title: 'Performance Upgrades',
                desc: 'Enhance your ride with premium tuning, advanced parts, and optimized handling — built to give you total control and next-level performance.',
              },
              {
                img: aii,
                title: 'Adventure Builds',
                desc: 'Create rugged, long-distance bikes built for off-road thrills and extreme journeys — combining durability with smart engineering.',
              },
              {
                img: appl,
                title: 'Adventure Builds',
                desc: 'Create rugged, long-distance bikes built for off-road thrills and extreme journeys — combining durability with smart engineering.',
              },
              {
                img: digi,
                title: 'Urban Commuter Series',
                desc: 'Craft lightweight, sleek bikes for everyday commuting — ensuring smooth performance, low maintenance, and standout looks in urban life.',
              },
              {
                img: ai,
                title: 'Restoration abhishek & Modding',
                desc: 'Give classic bikes a new life with full restorations, custom paint jobs, and modern enhancements — merging vintage soul with modern power.',
              },
            ].map(({ img, title, desc }, i) => (
              <div
                key={i}
                className="bg-[#CDD2DA] text-black p-5 sm:p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <img src={img} alt="icon" className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-bold mb-2">{title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
