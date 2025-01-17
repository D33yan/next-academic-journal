"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from '../firebaseConfig'; // Adjust the path as needed
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {  UserIcon,ArrowRightEndOnRectangleIcon,TrashIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error("Sign out error", error);
    });
  };

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/create-journal", text: "Journals" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <nav className="bg-gray-800 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-semibold text-lg">
                Uniabuja academic Journal
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="p-2 mx-1 rounded-3xl hover:bg-teal-700 focus:bg-teal-700 bg-teal-900 text-white font-bold">
                
                  <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 mx-1 rounded-3xl hover:bg-red-600 focus:bg-red-900 bg-red-900 text-white font-bold"
                >
                  <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium">
                Login
              </Link>
            )}
          </div>
          <div className="block md:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-gray-400 border-gray-400 hover:text-white hover:border-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.6 14.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L11.42 10l4.6-4.6c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L10 8.58 5.4 3.98c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4.6 4.6-4.6 4.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L10 11.42l4.6 4.6z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.text}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
