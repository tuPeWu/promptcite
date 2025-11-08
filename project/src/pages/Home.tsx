import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative w-screen h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* ✅ Fullscreen background logo */}
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/logo.png')" }}
      ></div>

      {/* ✅ Foreground content */}
      <div className="relative z-10 text-center space-y-4 max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 sm:text-2xl">
          {t('home.subtitle')}
        </p>
        <button
          onClick={() => navigate('/generate')}
          className="mt-8 px-8 py-4 bg-gray-900 text-white rounded-lg text-lg font-semibold hover:bg-black transition-colors"
        >
          {t('home.cta')}
        </button>
      </div>
    </div>
  );
};

export default Home;
