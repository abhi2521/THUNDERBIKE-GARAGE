import { useEffect } from 'react';
import service from '../assets/records.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

const statsData = [
  { target: 900, label: 'ON GOING BIKE SERVICE', icon: 'fas fa-tools', suffix: '+' },
  { target: 2000, label: 'DELIVERED BIKES', icon: 'fas fa-motorcycle', suffix: '+' },
  { target: 8000, label: 'HAPPY CLIENTS', icon: 'fas fa-smile', suffix: '+' },
  { target: 70, label: 'ON MARKET', icon: 'fas fa-chart-line', suffix: '+' },
  { target: 3, label: 'TOP 03 IN MARKET', icon: 'fas fa-award', prefix: '#' },
];

function Records() {
  useEffect(() => {
    const counters = document.querySelectorAll('.service-card h1');

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      let count = 0;

      const updateCount = () => {
        const increment = target / 100;

        if (count < target) {
          count += increment;
          counter.innerText = prefix + Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = prefix + target + suffix;
        }
      };

      updateCount();
    });
  }, []);

  return (
    <div className='bg-[#151E30]'>
      {/* Banner */}
      <section>
        <div className="relative">
          <img 
            src={service} 
            alt="banner" 
            className="w-full h-[180px] sm:h-[220px] md:h-[300px] lg:h-[400px] object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            
          </div>
        </div>
      </section>

      {/* Services Title */}
      <section className="py-6 px-4">
        <p className="text-center text-lg font-semibold tracking-wide text-gray-100">
          OUR SERVICES
        </p>
      </section>

      {/* Paragraphs */}
      <section className="flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-12 lg:px-24 py-8 text-gray-200">
        <div className="flex-1">
          <p className="text-xs xs:text-sm sm:text-base">
            Thunderbike Garage empowers riders with innovative custom bike builds, precision performance tuning, electric bike technology, and expert restoration services. We help enthusiasts ride farther, turn heads, and elevate their road experience with every machine.
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs xs:text-sm sm:text-base">
            Thunderbike Garage delivers cutting-edge motorcycle solutions through expert craftsmanship, modern engineering, and rider-focused design. From urban cruisers to adventure beasts, we build bikes that combine performance, style, and reliability to elevate every ride.
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {statsData.map((item, index) => (
            <div
              className="bg-[#EDEFF3] text-black p-3 sm:p-4 md:p-6 rounded-lg shadow-lg text-center service-card hover:scale-105 transition-transform duration-300"
              key={index}
            >
              <i className={`${item.icon} text-yellow-400 text-lg sm:text-xl md:text-2xl mb-2`}></i>
              <h1
                data-target={item.target}
                data-prefix={item.prefix || ''}
                data-suffix={item.suffix || ''}
                className="text-xl sm:text-2xl md:text-3xl font-bold"
              >
                0
              </h1>
              <p className="mt-1 text-[10px] xs:text-xs sm:text-sm md:text-[13px] leading-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Records;   