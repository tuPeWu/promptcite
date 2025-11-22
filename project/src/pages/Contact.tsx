import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  // pull social links as objects
  const profile = t('contact.profile', { returnObjects: true }) as {
    url: string;
    text: string;
  };
  const university = t('contact.university', { returnObjects: true }) as {
    url: string;
    text: string;
  };
  const linkedin = t('contact.social.linkedin', { returnObjects: true }) as {
    url: string;
    text: string;
  };

  const emails = t('contact.email', { returnObjects: true }) as {
    as: string;
    usz: string;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{t('contact.title')}</h1>

      <div className="mb-6">
        <img
          src="/cv%20photo.png"
          alt={t('contact.name')}
          className="w-48 h-48 object-cover shadow-lg"
        />
      </div>

      <div className="prose prose-lg">
        <p className="text-xl font-semibold">{t('contact.name')}</p>
        <p className="mb-6">
          {profile.text}
          <br />
          {university.text}
        </p>

        <h2 className="text-2xl font-semibold mb-4">{t('contact.findMe')}</h2>
        <ul className="list-none p-0">
          <li className="mb-2">
            <a
              href={linkedin.url}
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkedin.text}
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">{t('contact.contactMe')}</h2>
        <p>
          <a href={`mailto:${emails.as}`} className="text-blue-600 hover:text-blue-800">
            {emails.as}
          </a>
          <br />
          <a href={`mailto:${emails.usz}`} className="text-blue-600 hover:text-blue-800">
            {emails.usz}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
