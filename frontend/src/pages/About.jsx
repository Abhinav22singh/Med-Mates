import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div >
      
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-sky-500 font-medium'> US
        </span>
    </p>
        
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <b>Welcome to MedMates</b>
          <p>Your trusted partner in managing healthcare needs with ease and convenience. At MedMates, we understand the challenges individuals face when it comes to scheduling doctor appointments and keeping track of their health records.</p>

          <p>MedMates is committed to excellence in healthcare technology. We continuously work to improve our platform, integrating the latest innovations to provide a seamless user experience and deliver top-quality service. Whether you are booking your very first appointment or managing ongoing care, MedMates is here to support you every step of the way.</p>

          <b>Our Vision</b>
          
          <p>At MedMates, our vision is to create a seamless healthcare experience for every user. We strive to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, whenever you need it.</p>
        </div>
      </div>


    <div className='text-xl my-4'>
      <p>WHY <span className='text-sky-500 font-semibold'>CHOOSE US</span></p>
    </div>
<div className="flex flex-col md:flex-row justify-between gap-8 mb-20 px-6 md:px-12">
  <div className="group flex-1 bg-white shadow-md rounded-xl p-6 border border-gray-200 
                  hover:bg-sky-500 transition duration-300 cursor-pointer">
    <b className="block text-lg text-gray-700 mb-2 group-hover:text-white">
      Efficiency :
    </b>
    <p className="text-gray-600 leading-relaxed group-hover:text-white">
      Online appointment booking reduces waiting times, streamlines doctor scheduling, and allows patients to access healthcare services quickly without unnecessary delays.
    </p>
  </div>

  <div className="group flex-1 bg-white shadow-md rounded-xl p-6 border border-gray-200 
                  hover:bg-sky-500 transition duration-300 cursor-pointer">
    <b className="block text-lg text-gray-700 mb-2 group-hover:text-white">
      Convenience :
    </b>
    <p className="text-gray-600 leading-relaxed group-hover:text-white">
      Patients can book appointments anytime, anywhere, eliminating the need to physically visit clinics or make repeated phone calls. Reminders and notifications also help them stay on track.
    </p>
  </div>

  <div className="group flex-1 bg-white shadow-md rounded-xl p-6 border border-gray-200 
                  hover:bg-sky-500 transition duration-300 cursor-pointer">
    <b className="block text-lg text-gray-700 mb-2 group-hover:text-white">
      Personalization :
    </b>
    <p className="text-gray-600 leading-relaxed group-hover:text-white">
      The system suggests doctors based on specialization, location, and patient preferences, providing a tailored healthcare experience that fits individual needs.
    </p>
  </div>
</div>

    </div>
  )
}

export default About
