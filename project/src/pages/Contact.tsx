import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <div className="prose prose-lg">
        <p className="text-xl font-semibold">Paweł Wolski, PhD</p>
        <p className="mb-6">
          Akademia Sztuki w Szczecinie / Uniwersytet Szczeciński
          <br />
          <a
            href="https://www.akademiasztuki.eu/Product/pawel-wolski-dr-hab"
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.akademiasztuki.eu/Product/pawel-wolski-dr-hab
          </a>
        </p>

        <h2 className="text-2xl font-semibold mb-4">Find me at:</h2>
        <ul className="list-none p-0">
          <li>
            <a
              href="https://www.linkedin.com/in/pawelwolski-akademiasztuki"
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.linkedin.com/in/pawelwolski-akademiasztuki
            </a>
          </li>
          <li>
            <a
              href="https://github.com/tuPeWu/promptograf"
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/tuPeWu/promptograf
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact me at:</h2>
        <p>
          <a href="mailto:p.wolski.ux@akademiasztuki.eu" className="text-blue-600 hover:text-blue-800">
            p.wolski.ux@akademiasztuki.eu
          </a>
          <br />
          <a href="mailto:pawel.wolski@usz.edu.pl" className="text-blue-600 hover:text-blue-800">
            pawel.wolski@usz.edu.pl
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;