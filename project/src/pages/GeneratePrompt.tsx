import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const GeneratePrompt = () => {
  const [formData, setFormData] = useState({
    prompt: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    aiModel: '',
    otherModel: '',
    additionalInfo: ''
  });
  const [citation, setCitation] = useState('');
  const [showCitation, setShowCitation] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstFiveWords = formData.prompt.split(' ').slice(0, 5).join(' ');
    const model = formData.aiModel === 'Other' ? formData.otherModel : formData.aiModel;
    const repositoryLink = `https://prompt-cite.com/prompts/${Date.now()}`;
    const citationText = `${formData.author}, "${firstFiveWords}...", ${model}${
      formData.additionalInfo ? `, ${formData.additionalInfo}` : ''
    }, ${formData.date}, ${repositoryLink}`;
    setCitation(citationText);
    setShowCitation(true);
    if (isAuthenticated && user) {
      try {
        if (!user?.sub || !formData.prompt || !formData.author) {
          console.warn("⚠️ Missing required fields. Prompt NOT saved.");
          return;
        }
          
        const newPrompt = {
          userId: user.sub,
          prompt: formData.prompt,
          author: formData.author,
          date: formData.date,
          aiModel: model,
          additionalInfo: formData.additionalInfo,
          citation: citationText,
          createdAt: Timestamp.now(),
          deleted: false 
        };
        
        
        console.log('🧪 Attempting to add prompt:', newPrompt); 

        console.log("🧪 Attempting to write to Firestore:", {
          userId: user?.sub,
          prompt: formData.prompt,
          author: formData.author,
          date: formData.date,
          aiModel: model,
          additionalInfo: formData.additionalInfo,
          citation: citationText,
          createdAt: Timestamp.now()
        });
        
        
        await addDoc(collection(db, 'prompts'), newPrompt);
        
        console.log('✅ Prompt successfully stored in Firestore');
      } catch (error) {
        console.error('❌ Error storing prompt in Firestore:', error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 flex">
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste your prompt here
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
              Author of the prompt
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
              Date
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
              AI Model
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
                placeholder="Enter AI model name"
                className="mt-2 w-full p-2 border rounded-md"
                value={formData.otherModel}
                onChange={(e) => setFormData({ ...formData, otherModel: e.target.value })}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OPTIONAL: Additional info (e.g., version of the AI Model)
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
            className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-black transition-colors"
          >
            GENERATE
          </button>
        </form>
      </div>
      {showCitation && (
        <div className="hidden md:block w-1/2 mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Generated Citation</h2>
          <div className="bg-white p-4 rounded border mb-4">
            <p className="font-mono">{citation}</p>
            <button
              onClick={() => navigator.clipboard.writeText(citation)}
              className="mt-2 px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Copy to clipboard
            </button>
          </div>
          <div className="flex justify-center">
            <QRCodeSVG value={citation} size={128} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePrompt;