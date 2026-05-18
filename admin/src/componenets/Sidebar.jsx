import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)

  return (
    <div className="min-h-screen bg-white border-r w-64">
      {aToken && (
        <ul className="text-[#515151] mt-5 space-y-2 px-3">

          {/* Dashboard */}
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
              ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.home_icon} alt="" className="w-5" />
            <p>Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to="/all-apointements"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
              ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-5" />
            <p>Appointments</p>
          </NavLink>

          {/* Add Doctor */}
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
              ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.add_icon} alt="" className="w-5" />
            <p>Add Doctor</p>
          </NavLink>

          {/* Doctor List */}
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
              ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.people_icon} alt="" className="w-5" />
            <p>Doctors List</p>
          </NavLink>

        </ul>
      )}
    </div>
  )
}

export default Sidebar