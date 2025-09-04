import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";

const Navbar = () => {
  const { token, displayLogin, setDisplayLogin } = useContext(ItemContext);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="bg-black flex justify-between items-center w-screen relative w-screen">
      {/* Logo */}
      <Link
        to="/"
        className="no-underline"
        onClick={() => setDisplayLogin(false)}
      >
        <h5 className="p-5 pb-6 text-white hover:text-gray-500 transition-colors duration-200">
          RotMG Loot Tracker
        </h5>
      </Link>

      {/* Desktop Navigation */}
      {token ? (
        <NavLink to="/settings" className="hidden md:block">
          <img src={assets.userImg} className="px-5"></img>
        </NavLink>
      ) : (
        <div className="hidden md:block">
          <div className="flex gap-3 absolute left-1/2 transform -translate-x-1/2">
            <NavLink
              to="/"
              className="px-2"
              onClick={() => setDisplayLogin(false)}
            >
              <p className="text-white">Home</p>
            </NavLink>
            <NavLink to="/faq" onClick={() => setDisplayLogin(false)}>
              <p className="text-white">FAQ</p>
            </NavLink>
          </div>
          <p
            onClick={() => setDisplayLogin(!displayLogin)}
            className="px-5 text-sm cursor-pointer"
          >
            Sign In / Register
          </p>
        </div>
      )}

      {/* Navlinks Menu on Mobile */}
      <i
        onClick={() => setSidebarVisible(true)}
        className="bi bi-list md:hidden px-5 text-3xl bold-icon cursor-pointer"
      ></i>

      {/* Mobile Navigation */}
      <div
        className={`absolute top-0 right-0 bottom-0 md:hidden overflow-hidden bg-black z-2 text-white ${
          sidebarVisible ? "w-full h-screen" : "w-0"
        }`}
      >
        <div className="flex flex-col justify-center">
          <i
            onClick={() => setSidebarVisible(false)}
            className="bi bi-arrow-right-short bold-icon text-5xl text-right px-3 py-3"
          ></i>
          <NavLink
            onClick={() => {
              setSidebarVisible(false);
              setDisplayLogin(false);
            }}
            className={`mobile text-lg px-10 py-5 border-t border-b border-white`}
            to="/"
          >
            <p>HOME</p>
          </NavLink>
          <NavLink
            onClick={() => {
              setSidebarVisible(false);
              setDisplayLogin(false);
            }}
            className={`mobile text-lg px-10 py-5 border-t border-b border-white`}
            to="/faq"
          >
            <p>FAQ</p>
          </NavLink>
          {token ? (
            <>
              <NavLink
                onClick={() => {
                  setSidebarVisible(false);
                  setDisplayLogin(false);
                }}
                className={`mobile text-lg px-10 py-5 border-t border-b border-white cursor-pointer`}
                to="/settings"
              >
                <p>SETTINGS</p>
              </NavLink>
              <div
                onClick={() => {
                  setSidebarVisible(false);
                  setDisplayLogin(false);
                }}
                className={`mobile text-lg px-10 py-5 border-t border-b border-white cursor-pointer`}
              >
                <p>SIGN OUT</p>
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                setSidebarVisible(false);
                setDisplayLogin(true);
              }}
              className={`mobile text-lg px-10 py-5 border-t border-b border-white cursor-pointer ${
                displayLogin && "bg-[#C4C4C4] text-black"
              }`}
            >
              <p>LOGIN / SIGN UP</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
