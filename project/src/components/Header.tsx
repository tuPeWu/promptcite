import React from 'react';
import { Link } from 'react-router-dom';
import AccountDropdown from './AccountDropdown';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-bold text-gray-900">PromptCite</Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              {t('nav.about')}
            </Link>
            <Link to="/instructions" className="text-gray-600 hover:text-gray-900">
              {t('nav.instructions')}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              {t('nav.contact')}
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* 🔤 Language Switcher */}
          <button
            onClick={() => handleChangeLanguage('en')}
            className={`px-2 py-1 rounded text-sm ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            EN
          </button>
          <button
            onClick={() => handleChangeLanguage('pl')}
            className={`px-2 py-1 rounded text-sm ${i18n.language === 'pl' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            PL
          </button>

          <AccountDropdown />
        </div>
      </nav>
    </header>
  );
};

export default Header;
