import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className='bg-[#1B4332] text-white'>
        <div className="container mx-auto flex justify-between items-center py-2 px-3">
            <div className='hidden md:flex items-center space-x-4'>
                <a href="#" className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5'/>
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5'/>
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <RiTwitterXLine className='h-4 w-4'/>
                </a>
            </div>
            <div className='text-sm text-center flex-grow'>
                <span>We ship worldwide - Fast and reliable shipping!</span>
            </div>
            <div className='text-sm hidden md:block'>
                <a href="tel:+8899889898" className='hover:text-gray-300'>
                    +8 899 889 898
                </a>
            </div>
        </div>
    </div>
  )
}

export default Topbar