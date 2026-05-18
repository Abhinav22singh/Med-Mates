import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        All Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
          doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-2xl transition duration-300"
            >

              {/* Image */}
              <div className="relative rounded-xl overflow-hidden group mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 z-10 rounded-xl"></div>

                <img
                  src={item.image}
                  alt=""
                  className="w-full h-44 object-cover rounded-xl transition duration-300 group-hover:scale-110 group-hover:brightness-75"
                />
              </div>

              {/* Content */}
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-500 text-sm mb-3">{item.speciality}</p>

                <div className="flex items-center gap-2 mt-2">
                  <input 
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox" 
                    checked={item.available}
                    readOnly
                    className="accent-green-500"
                  />
                </div>
              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default DoctorsList