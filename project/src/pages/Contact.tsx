import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  // pull social links as objects
  const profile = t('contact.profile', { returnObjects: true }) as {
    url: string;
    text: string;
  };
  const linkedin = t('contact.social.linkedin', { returnObjects: true }) as {
    url: string;
    text: string;
  };
  const github = t('contact.social.github', { returnObjects: true }) as {
    url: string;
    text: string;
  };

  const emails = t('contact.emails', { returnObjects: true }) as {
    as: string;
    usz: string;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        {t('contact.title')}
      </h1>

      <div className="prose prose-lg">
        <p className="text-xl font-semibold">
          {t('contact.name')}
        </p>
        <p className="mb-6">
          {t('contact.institution')}
          <br />
          <a
            href={profile.url}
            className="text-gray-900 hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.text}
          </a>
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          {t('contact.findMe')}
        </h2>
        <ul className="list-none p-0">
          <li>
            <a
              href={linkedin.url}
              className="text-gray-900 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkedin.text}
            </a>
          </li>
          <li>
            <a
              href={github.url}
              className="text-gray-900 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              {github.text}
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">
          {t('contact.contactMe')}
        </h2>
        <p>
          <a
            href={`mailto:${emails.ux}`}
            className="text-gray-900 hover:text-black"
          >
            {emails.ux}
          </a>
          <br />
          <a
            href={`mailto:${emails.usz}`}
            className="text-gray-900 hover:text-black"
          >
            {emails.usz}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
