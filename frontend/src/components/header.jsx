import React from "react";
import { assets } from "../assets/assets";

const header = () => {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap 
  bg-gradient-to-tr from-sky-400 via-indigo-400 to-pink-400 
  rounded-lg px-6 md:px-10 lg:px-20"
    >
      {/* left side */}
      <div className="md:w-1/2 flex flex-col item-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] ">
        <p
          className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight
"
        >
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div
          className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light
"
        >
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> and schedule your appointment
          </p>
        </div>
        <a
  href="#speciality"
  className="flex items-center justify-center gap-2 
             bg-white shadow-md rounded-full 
             w-[200px] h-10 text-gray-600 text-sm font-medium 
             hover:scale-105 hover:shadow-lg transition-all duration-300"
>
  <span>Book Appointment</span>
  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500">
    <img className="w-3 invert" src={assets.arrow_icon} alt="" />
  </div>
</a>

      </div>
      {/* right side */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default header;
