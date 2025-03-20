import React from "react";
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpened, setIsOpened] = useState(false);

  const handleSearchToggle = () => {
    setIsOpened(!isOpened);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searchTerm:", searchTerm);
    setIsOpened(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpened ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpened ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Search Icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* Close Icon */}
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-800"
            onClick={handleSearchToggle}
          >
            <HiMiniXMark className="h-6 w-6 text-gray-800" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6 text-gray-800" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
