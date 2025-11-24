import React from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './AccountDropdown';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors relative z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white mr-8" onClick={closeMenu}>
            {t('nav.home')}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link to="/instructions" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                {t('nav.instructions')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                {t('nav.contact')}
              </Link>
            </li>
            <li>
              <Link to="/generate" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                {t('nav.generate')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Language switcher + Account + Mobile Menu Button */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => changeLang('en')}
              className={`
                px-2 py-1 rounded text-sm font-medium
                ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
              `}
            >
              EN
            </button>
            <button
              onClick={() => changeLang('pl')}
              className={`
                px-2 py-1 rounded text-sm font-medium
                ${i18n.language === 'pl' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
              `}
            >
              PL
            </button>
          </div>

          <ThemeToggle />
          <AccountDropdown />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg border-t dark:border-gray-700">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={closeMenu}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/instructions"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={closeMenu}
            >
              {t('nav.instructions')}
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={closeMenu}
            >
              {t('nav.contact')}
            </Link>
            <Link
              to="/generate"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={closeMenu}
            >
              {t('nav.generate')}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-4 px-3 py-2">
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Language:</span>
              <button
                onClick={() => changeLang('en')}
                className={`
                  px-2 py-1 rounded text-sm font-medium
                  ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
                `}
              >
                EN
              </button>
              <button
                onClick={() => changeLang('pl')}
                className={`
                  px-2 py-1 rounded text-sm font-medium
                  ${i18n.language === 'pl' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
                `}
              >
                PL
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
