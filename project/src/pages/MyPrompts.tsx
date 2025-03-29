import React, { useEffect, useState } from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MyPrompts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userPrompts, setUserPrompts] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrompts = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'prompts'),
          where('userId', '==', user.sub),
          where('deleted', '!=', true) // Exclude soft-deleted prompts
        );
        const querySnapshot = await getDocs(q);
        const prompts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserPrompts(prompts);
      } catch (err) {
        console.error('❌ Error fetching prompts:', err);
      }
    };

    if (isAuthenticated) fetchPrompts();
  }, [isAuthenticated, user]);

  const filteredPrompts = userPrompts.filter(prompt =>
    prompt.citation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    navigate(`/my-prompts/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this prompt?');
    if (!confirmed) return;

    try {
      await updateDoc(doc(db, 'prompts', id), {
        deleted: true,
        deletedAt: Timestamp.now()
      });
      setUserPrompts((prev) => prev.filter((p) => p.id !== id));
      console.log('🗑️ Prompt soft-deleted');
    } catch (err) {
      console.error('❌ Failed to soft-delete prompt:', err);
    }
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