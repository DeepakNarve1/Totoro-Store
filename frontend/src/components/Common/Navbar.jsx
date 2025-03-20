import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left-Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium text-gray-800">
            Todoro Store
          </Link>
        </div>
        {/* Center-Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-gray-800 hover:text-gray-600 text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/"
            className="text-gray-800 hover:text-gray-600 text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/"
            className="text-gray-800 hover:text-gray-600 text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="/"
            className="text-gray-800 hover:text-gray-600 text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>
        {/* Right- Icons */}
        <div className="flex items-center space-x-4">
          <Link to="profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-800" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-800" />
            <span className="absolute -top-1 -right-2 bg-emerald-700 text-white text-xs rounded-full px-1">
              2
            </span>
          </button>
          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
    </>
  );
};

export default Navbar;
