import React from 'react';
import ser from '../assets/Service.png';
import OverService from '../assets/13.png';
import Brakes from '../assets/14.png';
import SparkPlugs from '../assets/15.png';
import Helmet from '../assets/16.png';
import Crankset from '../assets/17.png';
import Fork from '../assets/12.png';

function Service() {
  const services = [
    { title: 'OverService', icon: OverService },
    { title: 'Brakes', icon: Brakes },
    { title: 'Spark plugs', icon: SparkPlugs },
    { title: 'Helmet', icon: Helmet },
    { title: 'Crankset', icon: Crankset },
    { title: 'Fork', icon: Fork },
  ];

  return (
    <>
      {/* Banner */}
      <section>
        <img src={ser} alt="Service Banner" className="w-full object-cover" />
      </section>

      {/* Services Section */}
      <section className="bg-[#0c204a] px-6 md:px-[8%] py-16">
        <div className="max-w-6xl mx-auto">
          {/* Heading Section */}
          <div className="text-center mb-12">
            <p className="text-[#7f56d9] font-semibold text-sm tracking-wider mb-2 uppercase">
              OUR SERVICES
            </p>
            <h2 className="text-white text-3xl font-semibold mb-4 leading-snug">
              We Provide A Lot of Cool Services
            </h2>
            <p className="text-white text-[15px] leading-relaxed max-w-2xl mx-auto">
              Far far away, beyond the winding roads and thunderous highways, deep in the valleys of Motoria and Gearlandia, live the restless engines. Separated they ride through Chromoplains.
            </p>
          </div>

          {/* Services Section Title */}
          <h3 className="text-white text-xl font-medium mb-8 text-center">Our Services</h3>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/90 p-6 rounded-xl shadow-md hover:-translate-y-3 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-700">
                      Even the all-powerful Engineering has no control over the wild riders.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Service; 