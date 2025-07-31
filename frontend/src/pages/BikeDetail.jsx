import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Footer from './footer.jsx';
// import Navbar from './navbar.jsx';

function BikeDetail() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bikes/${id}`)
      .then(res => {
        setBike(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching bike:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-white py-10">Loading...</p>;
  if (!bike) return <h2 className="text-center text-red-500 text-xl py-10">Bike not found</h2>;

  const description = bike.description || "";
  const firstHalf = description.split('. ').slice(0, 3).join('. ') + '.';
  const secondHalf = description.split('. ').slice(3).join('. ');

  return (
    <>
      {/* <Navbar /> */}

      <div className="bg-[#0d1b2a] text-white px-4 sm:px-6 md:px-10 lg:px-20 py-10 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">{bike.title}</h2>

        <div className="flex justify-center mb-8">
          <img
            src={`http://localhost:5000/uploads/${bike.image}`}
            alt={bike.title}
            className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-md"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 text-justify">
          <div className="w-full md:w-1/2 px-1 sm:px-2 text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] leading-[1.7] sm:leading-[1.8]">
            {firstHalf}
          </div>
          <div className="w-full md:w-1/2 px-1 sm:px-2 text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] leading-[1.7] sm:leading-[1.8]">
            {secondHalf}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default BikeDetail;
