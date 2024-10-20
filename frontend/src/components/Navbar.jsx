import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
    const navItems = [ // Define navItems array
        { name: 'Create Rule', path: '/createRule' },
        { name: 'Evaluate Rule', path: '/evaluateRule' },
        { name: 'Combine Rules', path: '/combineRules' },
        { name: 'Get All Rules', path: '/getAllRules' },
        { name: 'Modify Rule', path: '/modifyRule' },
      ];
    const [activeItem, setActiveItem] = useState(); 
  return (
    <nav className="bg-blue-950 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <Link 
                to="/" 
                className="flex items-center space-x-3 rtl:space-x-reverse"
                onClick={() => setActiveItem('')} >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Rule Engine</span>
              </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={` w-full md:block md:w-auto`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          
             {navItems.map((item) => ( 
            <li key={item.name}>
              <Link 
                to={item.path} 
                className={`block py-2 px-3 ${activeItem === item.name ? 'text-white bg-blue-700 rounded' : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'} dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                onClick={() => setActiveItem(item.name)} // Set active item on click
              >
                {item.name}
              </Link>
            </li>
          ))}
            {/* <li>
            <Link 
                to="/create-rule" 
                className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`} >
                Create Rule
              </Link>
            </li>
            <li  
              className={`block py-2 px-3  'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'} dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`} >
                Evaluate Rule
              </li>
            <li  
              className={`block py-2 px-3  'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'} dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`} >
                Combine Rules
              </li>
            <li  
              className={`block py-2 px-3  'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'} dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`} >
                Get All Rules
              </li>
            <li  
              className={`block py-2 px-3  'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'} dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`} >
                Modify Rule
              </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
