import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>
      <div className="prose prose-lg">
        <p className="text-xl mb-6">{t('about.intro')}</p>
        <p className="text-xl">{t('about.goal')}</p>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic whitespace-pre-line">
            {t('about.logoDescription')}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
            <img
              src="/logo_Edek.jpg"
              alt="Logo Edek"
              className="w-full md:w-1/3 max-h-64 object-contain rounded-lg shadow-lg"
            />
            <img
              src="/foto_Edek.jpg"
              alt="Edek"
              className="w-full md:w-1/3 max-h-64 object-contain rounded-lg shadow-lg"
            />
            <img
              src="/logo.png"
              alt="PromptCite Logo"
              className="w-full md:w-1/3 max-h-64 object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
