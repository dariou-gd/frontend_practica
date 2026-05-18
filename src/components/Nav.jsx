import React from "react";
import { Link } from "react-router";

const Nav = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">MyApp</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-200">
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-200">
              Products
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-200">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
