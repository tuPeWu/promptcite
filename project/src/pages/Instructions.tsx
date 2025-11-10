import React from 'react';
import { useTranslation } from 'react-i18next';

const Instructions = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{t('instructions.title')}</h1>
      <div className="prose prose-lg space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('instructions.gettingStarted.heading')}</h2>
          <ol className="list-decimal pl-6 space-y-4">
            {t('instructions.gettingStarted.steps', { returnObjects: true }).map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('instructions.usingCitation.heading')}</h2>
          <ul className="list-disc pl-6 space-y-4">
            {t('instructions.usingCitation.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('instructions.format.heading')}</h2>
          <p>{t('instructions.format.description')}</p>
          <pre className="bg-gray-50 p-4 rounded-md">
            {t('instructions.format.example')}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Instructions;