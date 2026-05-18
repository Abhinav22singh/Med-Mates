import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="pt-10">
      {/* Heading */}
      <div className="text-center text-2xl text-gray-500">
        <p>
          CONTACT <span className="text-sky-500 font-medium"> US</span>
        </p>
      </div>

      {/* Contact Content */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        {/* Image */}
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />

        {/* Text Content */}
        <div className="flex flex-col justify-center items-start gap-6 text-left">
          <p className="text-lg font-semibold text-gray-800">Our Office</p>
          <p className="text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500"> 
            📧 Email:{" "}
            <a
              href="mailto:abhiabhinav2205@gmail.com"
              className="text-sky-500 hover:underline"
            >
              abhiabhinav2205@gmail.com
            </a>
            <br />
           📞 Tele:{" "}
            <a
              className="text-sky-500 hover:underline"
            >
              +91 8544147596
            </a>
          </p>

          <p className="text-xl font-semibold text-gray-800">
            Careers at MEDMATES
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          {/* Button */}
          <button className=" bg-white shadow-md rounded-xl p-6 border border-gray-200 
                  hover:bg-sky-500 transition duration-300 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
