import { Link } from 'react-router-dom';
import ban from '../assets/abt3.png';

function About() {
  return (
    <>
      {/* Banner Section */}
      <section className="w-full relative">
        <img
          src={ban}
          alt="banner"
          className="w-full h-[180px] xs:h-[220px] sm:h-[280px] md:h-[350px] lg:h-[450px] object-cover object-center"
        />
      
      </section>

      <div className="bg-[#10182B]">
        {/* About Title */}
        <section className="text-center py-6 sm:py-8 px-4">
          <h2 className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium">
            ABOUT THUNDERBIKE GARAGE
          </h2>
        </section>

        {/* Content Sections */}
        <section className="space-y-8 sm:space-y-10 text-white px-4 sm:px-6 md:px-12 lg:px-24 pb-10">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 md:gap-10 text-justify"
            >
              <div className="w-full lg:w-1/2">
                <p className="text-xs xs:text-sm sm:text-base leading-relaxed sm:leading-loose">
                  Thunderbike Garage empowers riders with innovative custom builds, advanced modifications,
                  electric bike solutions, and touring-ready machines. We help riders go farther, ride harder,
                  and experience ultimate road freedom.
                  <br /><br />
                  Thunderbike Garage empowers riders with innovative custom builds, advanced modifications,
                  electric bike solutions, and touring-ready machines. We help riders go farther, ride harder,
                  and experience ultimate road freedom.
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-xs xs:text-sm sm:text-base leading-relaxed sm:leading-loose">
                  Thunderbike Garage empowers riders with innovative custom bike builds, advanced modifications,
                  electric conversions, and precision tuning. We help riders explore more, ride better,
                  and push the limits of performance.
                  <br /><br />
                  Thunderbike Garage empowers riders with innovative custom bike builds, advanced modifications,
                  electric conversions, and precision tuning. We help riders explore more, ride better,
                  and push the limits of performance.
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="flex flex-col lg:flex-row gap-8 sm:gap-10 px-4 sm:px-6 md:px-12 lg:px-24 pb-12 sm:pb-16">
          <div className="w-full lg:w-1/2">
            <p className="text-xs xs:text-sm sm:text-base leading-relaxed sm:leading-loose text-white">
              Thunderbike Garage empowers riders with innovative custom bike builds, performance tuning,
              electric bike solutions, and restoration services. We help riders push boundaries, turn heads,
              and experience the thrill of the open road.
            </p>
          </div>
          <div className="w-full lg:w-1/2 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-gray-800">ADDRESS</h3>
                <p className="text-xs sm:text-sm text-gray-700">
                  No. 42, Chain Street, Race Course Road, Madurai – 625002.
                </p>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mt-4 mb-2 text-gray-800">Call US</h3>
                <p className="text-xs sm:text-sm text-gray-700">
                  +91 63743 93936 / +91 86756 51401
                </p>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mt-4 mb-2 text-gray-800">Email Support</h3>
                <p className="text-xs sm:text-sm text-gray-700">
                  s@thunderbike.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;