"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle,getCurrentUser,signOutUser ,addCourseToCart} from "../firebase/FirebaseConfig";


export default function Navbar({onSearch}) {
  const [user, setUser] = useState(null);
  const [nav, setnav] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    fetchUser();
   
  }, []);
  
  const openNav = () => {
    if (nav) {
      setnav(false);
    } else {
      setnav(true);
    }
  };

   const handleSignIn = async () => {
    try {
      const userInfo = await signInWithGoogle();
      setUser(userInfo);
      console.log("Signed in user:", userInfo);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const searchTerm = event.target.value.trim();
      setSearchTerm(searchTerm);
      onSearch(searchTerm); 
    }
  };

  const handleButtonClick = (value)=>{
    setSearchTerm(value);
    onSearch(value);
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOutUser(); // Use signOutUser from FirebaseConfig
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAddToCart = async (courseId) => {
    if (user) {
      await addCourseToCart(user.uid, courseId);
      setCart([...cart, courseId]);
    } else {
      alert("Please sign in to add courses to your cart.");
    }
  };

  return (
    <>
      <div className="bg-white mx-auto flex flex-wrap max-w-7xl justify-between  px-4 py-8 sm:px-6 text-black lg:px-8">
        <Link
          to='/'
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          Logo
        </Link>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link to = '/Mycourses'><div className="text-xl font-medium text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">My courses</div></Link>
            <Link to = '/'> <button onClick={()=>handleButtonClick('python')} className="text-xl font-medium text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">Python</button></Link>
            <Link to = '/'><button onClick={()=>handleButtonClick('java')} className="text-xl font-medium text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">Java</button></Link>
          </div>
        </div>

  
        <div className="flex md:order-2 gap-2">
            {/* search bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch} // Call handleSearch on Enter key press
            />
          </div>

          <div className="flex items-center">
            {/* Get started button */}

            {user ? (
              <>
            <div onClick={toggleDropdown} className="flex items-center gap-1 bg-gray-300 rounded-xl p-1">
              <img src={user.photoURL} alt={user.displayName} className="h-8 w-8 rounded-full" />
              <span className="text-base font-semibold text-gray-800 dark:text-white">{user.displayName}</span>
            </div>
            {isDropdownOpen && (
                  <div className="absolute z-50 right-20 top-20 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Wishlist</Link>
                    <Link to="/AddtoCart" onClick={handleAddToCart} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cart</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Log Out</button>
                  </div>
                )}</>
          ) :(
            <button
              type="button"
              onClick={handleSignIn}
              className="text-white bg-purple-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </button>)}
            <button
              onClick={openNav}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        {nav && (
          <div
            className="items-center justify-between w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
