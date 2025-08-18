import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
const Navbar = ({setQuery}) => {
    const {user, logOut} = useAuth()
   
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      {/* Left Section */}
      <div className="flex items-center flex-shrink-0 text-white mr-6">
      
        <Link to="/" className="font-semibold text-xl tracking-tight">Note App</Link>
      </div>

      {/* Middle Section (Search Bar) */}
      <div className="flex-grow flex justify-center px-4">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full max-w-md px-4 py-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e)=> setQuery(e.target.value)}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center">
       

        {!user ? (
            <>
             <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 mr-2">
          Login
        </Link>
        <Link to="/register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 mr-2">
          Sign Up
        </Link>
            </>
        ):
        <>
         {/* Username (example) */}
        <span className="text-white mr-4">{user.name}</span>

        {/* Buttons using Link components */}

        <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0" onClick={logOut}>
          Logout
        </button>
        </>
        }
       
        
      </div>
    </nav>
  );
};

export default Navbar;
