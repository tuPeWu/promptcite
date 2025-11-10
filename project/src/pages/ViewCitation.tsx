import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ViewCitation = () => {
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
        console.log('🔍 Fetching citation with ID:', id);
        const docRef = doc(db, 'prompts', id);
        const snapshot = await getDoc(docRef);

        console.log('📊 Snapshot exists?', snapshot.exists());

        if (snapshot.exists()) {
          const data = snapshot.data();
          console.log('✅ Citation data retrieved:', data);
          setPromptData(data);

          // Generate citation with the actual document ID
          const firstFiveWords = data.prompt?.split(' ').slice(0, 5).join(' ');
          const model = data.aiModel === 'Other' ? data.otherModel : data.aiModel;
          const citationText = `${data.author}, "${firstFiveWords}...", ${model}${
            data.additionalInfo ? `, ${data.additionalInfo}` : ''
          }, ${data.date}, ${window.location.origin}/cite/${id}`;
          setCitation(citationText);
        } else {
          console.warn("⚠️ Citation not found - Document does not exist in Firestore");
          console.log('Document ID attempted:', id);
        }
      } catch (err: any) {
        console.error("❌ Error fetching citation:", err);
        console.error("Error code:", err?.code);
        console.error("Error message:", err?.message);

        // Check if it's a permission error
        if (err?.code === 'permission-denied') {
          console.error("🚫 PERMISSION DENIED - Firestore rules may not be set correctly");
          console.error("Please check Firestore security rules in Firebase Console");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center text-gray-600">Loading citation...</div>
      </div>
    );
  }

  if (!promptData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Citation Not Found</h1>
          <p className="text-gray-600">The requested citation does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Prompt Citation</h1>

        {/* Citation Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">CITATION</h2>
          <p className="font-mono text-sm text-gray-800 leading-relaxed">{citation}</p>
          <button
            onClick={() => navigator.clipboard.writeText(citation)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Copy Citation
          </button>
        </div>

        {/* Bibliographic Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Author</h3>
            <p className="text-lg text-gray-800">{promptData.author}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Prompt</h3>
            <p className="text-gray-800 bg-gray-50 p-4 rounded border">{promptData.prompt}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">AI Model</h3>
              <p className="text-gray-800">{promptData.aiModel}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Date</h3>
              <p className="text-gray-800">{promptData.date}</p>
            </div>
          </div>

          {promptData.additionalInfo && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Additional Information</h3>
              <p className="text-gray-800">{promptData.additionalInfo}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Citation ID</h3>
            <p className="font-mono text-sm text-gray-600">{id}</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            This is a permanent citation record. The information displayed here is for reference purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewCitation;
