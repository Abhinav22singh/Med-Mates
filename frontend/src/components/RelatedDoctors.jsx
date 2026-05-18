import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RelatedDoctors = ({speciality,docId }) => {
  const { doctors } = useContext(AppContext);
  
  const [relDoc, setRelDocs] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="px-6 py-12 bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 text-center">Related <span className="text-cyan-600">Doctors</span> To Book
      </h1>
      <p className="text-gray-500 text-center mt-2">
        Discover top specialists and book your appointment with ease
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {relDoc.slice(0, 5).map((items, index) => (
          <div
            onClick={() => {navigate(`/appointment/${items._id}`); scrollTo(0,0)}}
            key={index}
            className="bg-white rounded-2xl shadow-md transition p-5 flex flex-col items-center 
                   hover:shadow-lg hover:border hover:border-sky-300"
          >
            <img
              src={items.image}
              alt={items.name}
              className="mb-4 transition-transform duration-300 hover:scale-105"
            />
            <div className="flex items-center space-x-2 text-sm mb-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-green-600 font-medium">Available</p>
            </div>
            <p className="text-lg font-semibold text-gray-800">{items.name}</p>
            <p className="text-sm text-gray-500">{items.speciality}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => {
            navigate(`/doctors`);
            scrollTo(0, 0);
          }}
          className="px-6 py-2 bg-cyan-600 text-white font-medium rounded-lg shadow hover:bg-cyan-700 transition"
        >
          MORE
        </button>
      </div>
    </div>
  );
};

export default RelatedDoctors;
