import React from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './AccountDropdown';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <ul className="flex items-center space-x-8">
          <li>
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {t('nav.home')}
            </Link>
          </li>
          <li className="hidden md:block">
            <Link to="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              {t('nav.about')}
            </Link>
          </li>
          <li className="hidden md:block">
            <Link to="/instructions" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              {t('nav.instructions')}
            </Link>
          </li>
          <li className="hidden md:block">
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              {t('nav.contact')}
            </Link>
          </li>
          <li className="hidden md:block">
            <Link to="/generate" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              {t('nav.generate')}
            </Link>
          </li>
        </ul>

        {/* Right: Language switcher + Account */}
        <div className="flex items-center space-x-2">
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

          <ThemeToggle />
          <AccountDropdown />
        </div>
      </nav>
    </header>
  );
};

export default Header;
