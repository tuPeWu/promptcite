import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';

const GeneratePrompt = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prompt: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    aiModel: '',
    otherModel: '',
    additionalInfo: '',
  });

  // Auto-fill author field when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && !formData.author) {
      const userName = user.name || user.nickname || user.email || '';

      setFormData((prev) => ({
        ...prev,
        author: userName,
      }));
    }
  }, [isAuthenticated, user, formData.author]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstFiveWords = formData.prompt.split(' ').slice(0, 5).join(' ');
    const model = formData.aiModel === 'Other' ? formData.otherModel : formData.aiModel;

    try {
      if (!formData.prompt || !formData.author) {
        console.warn('⚠️ Missing required fields. Prompt NOT saved.');
        return;
      }

      // Save the prompt to get the auto-generated Firestore ID
      const docRef = await addDoc(collection(db, 'prompts'), {
        userId: user?.sub || 'anonymous',
        prompt: formData.prompt,
        author: formData.author,
        date: formData.date,
        aiModel: model,
        additionalInfo: formData.additionalInfo,
        citation: '', // Temporary empty citation
        createdAt: Timestamp.now(),
        deleted: false,
      });

      // Now generate the citation with the actual Firestore document ID
      const repositoryLink = `${window.location.origin}/cite/${docRef.id}`;
      const citationText = `${formData.author}, "${firstFiveWords}...", ${model}${
        formData.additionalInfo ? `, ${formData.additionalInfo}` : ''
      }, ${formData.date}, ${repositoryLink}`;

      // Update the document with the correct citation
      await updateDoc(doc(db, 'prompts', docRef.id), {
        citation: citationText,
      });

      // Redirect to the citation detail page
      navigate(`/cite/${docRef.id}`);
    } catch (error) {
      console.error('❌ Error storing prompt in Firestore:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex">
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('generatePrompt.promptLabel')}
            </label>
            <textarea
              required
              className="w-full h-32 p-3 border rounded-md"
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('generatePrompt.authorLabel')}
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('generatePrompt.dateLabel')}
            </label>
            <input
              type="date"
              required
              className="w-full p-2 border rounded-md"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('generatePrompt.modelLabel')}
            </label>
            <div className="space-y-2">
              {['ChatGPT', 'Gemini', 'Bielik', 'Other'].map((model) => (
                <div key={model} className="flex items-center">
                  <input
                    type="radio"
                    id={model}
                    name="aiModel"
                    value={model}
                    checked={formData.aiModel === model}
                    onChange={(e) => setFormData({ ...formData, aiModel: e.target.value })}
                    className="mr-2"
                  />
                  <label htmlFor={model}>{model}</label>
                </div>
              ))}
            </div>
            {formData.aiModel === 'Other' && (
              <input
                type="text"
                placeholder={t('generatePrompt.otherModelPlaceholder')}
                className="mt-2 w-full p-2 border rounded-md"
                value={formData.otherModel}
                onChange={(e) => setFormData({ ...formData, otherModel: e.target.value })}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('generatePrompt.additionalInfoLabel')}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('generatePrompt.generateButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneratePrompt;
