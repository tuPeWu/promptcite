import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Quote } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="text-center space-y-4 max-w-2xl">
        <Quote size={48} className="mx-auto text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Instantly generate bibliographic entries
        </h1>
        <p className="text-xl text-gray-600 sm:text-2xl">
          Track, share, and cite your AI-driven ideas
        </p>
        <button
          onClick={() => navigate('/generate')}
          className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start citing
        </button>
      </div>
    </div>
  );
};

export default Home;