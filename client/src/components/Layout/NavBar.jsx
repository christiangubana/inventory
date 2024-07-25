import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAddItem = () => {
    navigate('/add'); // Navigate to /add route
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-lg font-bold">Inventory</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                    <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-inherit">Logout</button>
                    <button onClick={handleAddItem} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-inherit">Add Item</button> {/* Add Item button */}
                  </>
                ) : (
                  <>
                    <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                    <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isLoggedIn && (
              <div className="flex items-center text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="mr-4">{username}</span>
              </div>
            )}
          </div>
          <div className="flex sm:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-inherit">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-inherit">Logout</button>
              <button onClick={() => { handleAddItem(); setIsOpen(false); }} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-inherit">Add Item</button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
