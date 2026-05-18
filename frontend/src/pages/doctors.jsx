import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-grey-600">
        Browse through the doctors specialist      <span className="text-sky-500 font-bold text-xl">
          {speciality}
        </span>
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-sky-500 text-white" : ""}`} onClick={()=> setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-4 text-sm text-grey-600 ${showFilter ? "flex" : "hidden sm:flex"} `}>
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer w-[94%] ${
      speciality === "General physician"
        ? "bg-sky-300 text-black"
        : "bg-grey-300"
    }`}
          >
            General Physician
          </p>

          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer w-[94%] ${
      speciality === "Gynecologist"
        ? "bg-sky-300 text-black"
        : "bg-grey-300"
    }`}
          >
            Gynecologist
          </p>

          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer w-[94%] ${
      speciality === "Dermatologist"
        ? "bg-sky-300 text-black"
        : "bg-grey-300"
    }`}
          >
          Dermatologist
          </p>

          <p
            onClick={() =>
              speciality === "Pediatrician"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer w-[94%] ${
      speciality === "Pediatricians"
        ? "bg-sky-300 text-black"
        : "bg-grey-300"
    }`}
          >
          Pediatrician
          </p>

          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer w-[94%] ${
      speciality === "Neurologist"
        ? "bg-sky-300 text-black"
        : "bg-grey-300"
    }`}
          >
            Neurologist
          </p>

          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
             className={`sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer w-[94%] ${
      speciality === "Gastroenterologist"
        ? "bg-sky-300 text-black"
        : "bg-grey-300"
    }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filterDoc.map((items, index) => (
            <div
              onClick={() => navigate(`/appointment/${items._id}`)}
              key={index}
              className="bg-white rounded-2xl shadow-md transition p-5 flex flex-col items-center 
                   hover:shadow-lg hover:border hover:border-sky-300 cursor-pointer"
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
              <p className="text-lg font-semibold text-gray-800">
                {items.name}
              </p>
              <p className="text-sm text-gray-500">{items.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
