import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
<div className="md:mx-10">
  <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
    {/* left */}
    <div>
      <img src={assets.logo} alt="" className="mb-5 w-42" />
      <p>
        Med Mates is a smart doctor appointment app designed to make
        healthcare simple, accessible, and hassle-free. Patients can easily
        browse through trusted doctors by specialty, check availability, and
        book appointments in just a few clicks.
      </p>
    </div>

    {/* center */}
    <div className="sm:pl-10"> 
      <p className="font-semibold text-xl mb-3 text-gray-900">COMPANY</p>
      <ul className="space-y-2">
        <li className="hover:text-sky-600 cursor-pointer">Home</li>
        <li className="hover:text-sky-600 cursor-pointer">About us</li>
        <li className="hover:text-sky-600 cursor-pointer">Contact us</li>
        <li className="hover:text-sky-600 cursor-pointer">Privacy Policy</li>
      </ul>
    </div>

    {/* right */}
    <div>
      <p className="font-semibold text-lg mb-3 text-gray-900">GET IN TOUCH</p>
      <ul className="space-y-2">
        <li>+91 8544147596</li>
        <li>abhiabhinav2205@gmail.com</li>
      </ul>
    </div>

    {/* copyright */}
    <div className="col-span-full mt-10">
      <hr className="mb-4" />
      <p className="text-center text-gray-600">
        © 2025 MedMates. All rights reserved.
      </p>
    </div>
  </div>
</div>

  );
};

export default Footer;
