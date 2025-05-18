import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>
      <div className="prose prose-lg">
        <p className="text-xl mb-6">{t('about.intro')}</p>
        <p className="text-xl">{t('about.goal')}</p>
      </div>
    </div>
  );
};

export default About;
