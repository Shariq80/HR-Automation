import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function Dashboard({ user }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const q = query(collection(db, 'jobs'), where('hrId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      setJobs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchJobs();
  }, [user]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      <Link href="/job/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create New Job Posting
      </Link>
      <h2 className="text-xl font-semibold">Your Job Postings</h2>
      <ul className="space-y-2">
        {jobs.map(job => (
          <li key={job.id} className="border p-4 rounded">
            <Link href={`/job/${job.id}`} className="text-blue-500 hover:underline">
              {job.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}