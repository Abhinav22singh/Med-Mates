import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token,setToken,userData} = useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false);
  const logout= ()=>{
    localStorage.removeItem("token")
    setToken(false)
  }

  return (
    <div className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      <img onClick={() => navigate(`/`)} className="w-44 cursor-pointer" src={assets.logo} alt="" />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/"><li className="py-1">HOME</li></NavLink>
        <NavLink to="/doctors"><li className="py-1">ALL DOCTORS</li></NavLink>
        <NavLink to="/about"><li className="py-1">ABOUT</li></NavLink>
        <NavLink to="/contact"><li className="py-1">CONTACT</li></NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer relative" onClick={() => setShowDropdown(!showDropdown)}>
            <img className="w-15 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            {showDropdown && (
              <div className="absolute top-8 right-0 mt-2 text-base font-medium text-grey-600 z-20">
                <div className="min-w-48 bg-sky-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={() => {navigate('my-profile'); setShowDropdown(false)}} className="cursor-pointer hover:text-sky-500">My Profile</p>
                  <p onClick={() => {navigate('my-appointments'); setShowDropdown(false)}} className="cursor-pointer hover:text-sky-500">My Appointments</p>
                  <p onClick={logout} className="cursor-pointer hover:text-sky-500">Logout</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate("login")} className="bg-sky-300 text-white px-8 py-3 rounded-full font-light hidden md:block">Create Account</button>
        )}

        <img onClick={() => setShowMenu(true)} className="ml-10 w-6 md:hidden" src={assets.menu_icon} alt="" /> 

        <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col items-center mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
