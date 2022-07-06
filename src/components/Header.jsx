import React, {useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import {useStateValue} from "../context/StateProvider";
import { actionType } from "../context/actionType";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [isMenu, setIsMenu] = useState(false);

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      console.log(refreshToken);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({ type: actionType.SET_USER, user: null });
  };

  const showCart = () => {
    dispatch({ type: actionType.SET_CART_SHOW, cartShow: !cartShow });
  };
  return (
    <header className="fixed z-50 w-full px-3 py-4 md:py-6 md:px-16 bg-red-300">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to="/" className="flex items-center justify-center gap-2">
          <motion.img
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, type: "tween" }}
            exit={{ opacity: 0, x: -200 }}
            src={Logo}
            alt="Logo"
            className="w-8 object-cover"
          />
          <motion.p
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, type: "tween" }}
            exit={{ opacity: 0, x: -200 }}
            className="text-headingColor text-xl font-bold"
          >
            City
          </motion.p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, type: "tween" }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
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
          </motion.ul>

          <div
            className="flex items-center justify-center relative"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-sm text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="userProfile"
              className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full cursor-pointer"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-100 shadow-xl p-2 rounded-xl flex flex-col absolute  top-12 -right-0 md:top-12 md:-right-12 "
              >
                {user && user.email !== "tranngocsinh12121@gmail.com" && (
                  <Link to="/createItem">
                    <p
                      className="text-base text-textColor px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out rounded-xl "
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="text-base text-textColor px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out rounded-xl "
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden flex items-center justify-between  w-full h-full ">
        <div className="flex items-center justify-center relative">
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-2">
              <p className="text-sm text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to="/" className="flex items-center justify-center gap-2">
          <img src={Logo} alt="Logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <img
            src={user ? user.photoURL : Avatar}
            alt="userProfile"
            className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full cursor-pointer"
            onClick={login}
          />
          {isMenu && (
            <div className="w-40 bg-gray-100 shadow-xl p-2 rounded-xl flex flex-col absolute top-12 -right-0 md:top-12 md:-right-12 ">
              {user && user.email !== "tranngocsinh1212@gmail.com" && (
                <Link to="/createItem">
                  <p className="text-base text-textColor px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out rounded-xl ">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out  px-4 py-2">
                  Home
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2 ">
                  Menu
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2 ">
                  About us
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2">
                  Service
                </li>
              </ul>
              <p
                className="text-base text-textColor px-4 py-2 flex items-center justify-center gap-3 cursor-pointer bg-slate-300 shadow-md hover:bg-slate-200 transition-all duration-100 ease-in-out rounded-xl "
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
