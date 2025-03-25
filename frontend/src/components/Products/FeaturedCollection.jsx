import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/Dead.jpg";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your evryday life
          </h2>
          <p className="text-lg text-gray-800 mb-6">
            Discover the latest styles straight from the runway, freshly added
            to keep your wardrobe on the cutting edge of fashion.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-3 rounded-sm text-lg hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
