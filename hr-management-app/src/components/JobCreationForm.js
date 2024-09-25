import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function JobCreationForm({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'jobs'), {
        title,
        description,
        hrId: user.uid,
        createdAt: new Date(),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job Description"
        required
        className="w-full p-2 border rounded h-32"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Create Job Posting
      </button>
    </form>
  );
}