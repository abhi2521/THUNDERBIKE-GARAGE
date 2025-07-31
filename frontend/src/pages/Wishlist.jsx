import { useLocation, Link } from 'react-router-dom';
import { HeartFilled, CloseCircleFilled } from '@ant-design/icons';
import { Button, Image, Spin } from 'antd';
import { useState } from 'react';

function Wishlist() {
    const location = useLocation();
    const { wishlist = [], bikes = [] } = location.state || {};

    // 🟡 State to manage wishlist locally
    const [wishlistIds, setWishlistIds] = useState(wishlist);

    // Filter bikes that are in the wishlist
    const wishlistBikes = bikes.filter(bike => wishlistIds.includes(bike._id));

    // ❌ Function to remove bike from wishlist
    const handleRemove = (id) => {
        const updated = wishlistIds.filter(bikeId => bikeId !== id);
        setWishlistIds(updated);
    };

    return (
        <div className="min-h-screen bg-[#131B2E] p-4 xs:p-6 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl xs:text-2xl sm:text-3xl text-white font-bold">
                        Your Wishlist <HeartFilled style={{ color: 'red' }} />
                    </h1>
                    <Link to="/event">
                        <Button type="primary" className="bg-[#C1D93C] text-black hover:!bg-[#a8bf2a]">
                            Back to Bikes
                        </Button>
                    </Link>
                </div>

                {wishlistBikes.length === 0 ? (
                    <div className="text-center py-16 text-white">
                        <p className="text-lg mb-4">Your wishlist is empty</p>
                        <Link to="/event">
                            <Button type="primary" className="bg-[#FC0919] text-white">
                                Explore Bikes
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
                        {wishlistBikes.map(bike => (
                            <div key={bike._id} className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">

                                {/* ❌ Close Icon Button */}
                                <button
                                    onClick={() => handleRemove(bike._id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg z-10"
                                    title="Remove from Wishlist"
                                >
                                    <CloseCircleFilled />
                                </button>

                                <Link to={`/bike/${bike._id}`}>
                                    <div className="relative h-40 xs:h-48 sm:h-56 w-full">
                                        <Image
                                            src={`http://localhost:5000/uploads/${bike.image}`}
                                            alt={bike.title}
                                            className="object-cover w-full h-full"
                                            fallback="https://via.placeholder.com/300x200?text=No+Image"
                                        />
                                    </div>
                                    <div className="p-3 sm:p-4">
                                        <h3 className="font-semibold text-sm xs:text-base sm:text-lg mb-1">{bike.title}</h3>
                                        <p className="text-gray-600 text-xs xs:text-sm">{bike.description.slice(0, 100)}...</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist;
