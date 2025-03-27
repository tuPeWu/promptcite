import React, { useState } from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';

const MyPrompts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in production this would come from your database
  const mockPrompts = [
    {
      id: 1,
      citation: '[John Doe], "Create a landing page for...", ChatGPT, GPT-4, 2024-03-15, https://prompt-cite.com/prompts/123',
      prompt: 'Create a landing page for a new SaaS product with modern design principles',
      author: 'John Doe',
      date: '2024-03-15',
      model: 'ChatGPT',
      additionalInfo: 'GPT-4'
    },
    {
      id: 2,
      citation: '[John Doe], "Generate a color palette for...", Gemini, Pro, 2024-03-14, https://prompt-cite.com/prompts/124',
      prompt: 'Generate a color palette for a luxury brand identity',
      author: 'John Doe',
      date: '2024-03-14',
      model: 'Gemini',
      additionalInfo: 'Pro'
    }
  ];

  const filteredPrompts = mockPrompts.filter(prompt =>
    prompt.citation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    // Implement edit functionality
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">My Prompts</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredPrompts.map((prompt) => (
          <div key={prompt.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold font-mono break-all">{prompt.citation}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(prompt.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(prompt.id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Prompt:</span> {prompt.prompt}
              </div>
              <div>
                <span className="font-semibold">Author:</span> {prompt.author}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {prompt.date}
              </div>
              <div>
                <span className="font-semibold">Model:</span> {prompt.model}
              </div>
              {prompt.additionalInfo && (
                <div>
                  <span className="font-semibold">Additional Info:</span> {prompt.additionalInfo}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No prompts found. Start generating some citations!
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPrompts;