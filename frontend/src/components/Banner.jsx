import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate()
  return (
   <div className="bg-gradient-to-tr from-sky-400 via-indigo-400 to-pink-400  rounded-lg px-6 sm:px-14 lg:px-12 my-20 md:mx-10 relative">
  <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
    <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
      <p>BOOK APPOINMENT</p>
      <p className="mt-4">With 100+ Trusted Doctors</p>
    </div>
    
    <button onClick={()=>{navigate(`/login`); scrollTo(0.0)}} className="mt-4 px-6 py-3 bg-white text-sky-600 font-semibold rounded-full shadow hover:scale-105 transition-all">
      Create Account
    </button>
  </div>

  <div className="hidden md:block absolute bottom-0 right-0 w-1/2 lg:w-[380px]">
    <img
      src={assets.appointment_img}
      alt=""
      className="w-full max-w-md"
    />
  </div>
</div>

  );
};

export default Banner;
