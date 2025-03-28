import React from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './AccountDropdown';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold text-gray-900">PromptCite</Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/instructions" className="text-gray-600 hover:text-gray-900">Instructions</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <AccountDropdown />
        </div>
      </nav>
    </header>
  );
};

export default Header;
