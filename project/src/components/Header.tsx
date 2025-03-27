import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold text-gray-900">Prompt-Cite</Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/instructions" className="text-gray-600 hover:text-gray-900">Instructions</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign in</Link>
          <div className="relative">
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <User size={20} />
              <span>Account</span>
              <ChevronDown size={16} />
            </button>
            
            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/my-prompts"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Prompts
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;