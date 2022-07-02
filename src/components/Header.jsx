import React from "react";
import { MdShoppingBasket } from "react-icons/md";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";

const Header = () => {
  return (
    <header className="fixed z-50 w-full  py-6 px-16 bg-red-300">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <img src={Logo} alt="Logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
              Home
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
              Menu
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out ">
              About us
            </li>
            <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
              Service
            </li>
          </ul>

          <div className="flex items-center justify-center relative">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
              <p className="text-sm text-white font-semibold">2</p>
            </div>
          </div>
          <img
            src={Avatar}
            alt="userProfile"
            className="w-10 min-w-[40px] h-10 min-h-[40px]"
          />
        </div>
      </div>
      {/* mobile */}
      <div className="flex md:hidden w-full h-full "></div>
    </header>
  );
};

export default Header;
