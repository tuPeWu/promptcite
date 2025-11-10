import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const SinglePrompt = () => {
  const { id } = useParams();
  const [promptData, setPromptData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [citation, setCitation] = useState('');

  useEffect(() => {
    const fetchPrompt = async () => {
      if (!id) {
        console.warn("❌ No ID found. Aborting...");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'prompts', id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setPromptData(data);
          generateCitation(data);
        } else {
          console.warn("⚠️ Document not found");
        }
      } catch (err) {
        console.error("❌ Error fetching document:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);

  const generateCitation = (data: any) => {
    const firstFiveWords = data.prompt?.split(' ').slice(0, 5).join(' ');
    const model = data.aiModel === 'Other' ? data.otherModel : data.aiModel;
    const citationText = `${data.author}, "${firstFiveWords}...", ${model}${
      data.additionalInfo ? `, ${data.additionalInfo}` : ''
    }, ${data.date}, ${window.location.origin}/cite/${id}`;
    setCitation(citationText);
  };

  const handleChange = (field: string, value: string) => {
    setPromptData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleRegenerate = async () => {
    if (!id || !promptData) return;

    generateCitation(promptData);

    try {
      await updateDoc(doc(db, 'prompts', id), {
        ...promptData,
        citation,
        updatedAt: new Date().toISOString(),
      });
      alert('✅ Prompt updated and citation regenerated!');
    } catch (err) {
      console.error('❌ Failed to update prompt:', err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!promptData) return <div className="p-6 text-center text-red-500">Prompt not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Prompt</h1>

      <div className="space-y-4">
        <textarea
          className="w-full h-24 p-2 border rounded"
          value={promptData.prompt}
          onChange={(e) => handleChange('prompt', e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={promptData.author}
          onChange={(e) => handleChange('author', e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={promptData.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={promptData.aiModel}
          onChange={(e) => handleChange('aiModel', e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={promptData.additionalInfo || ''}
          onChange={(e) => handleChange('additionalInfo', e.target.value)}
        />
      </div>

      <button
        onClick={handleRegenerate}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        RE-GENERATE
      </button>

      <div className="mt-8 p-4 bg-gray-100 border rounded">
        <h2 className="font-semibold mb-2">Generated Citation</h2>
        <pre className="whitespace-pre-wrap text-sm font-mono">{citation}</pre>
      </div>
    </div>
  );
};

export default SinglePrompt;
