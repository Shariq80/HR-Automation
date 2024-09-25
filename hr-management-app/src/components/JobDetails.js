import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function JobDetails({ jobId }) {
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      // Fetch job details
      const jobDoc = await getDoc(doc(db, 'jobs', jobId));
      if (jobDoc.exists()) {
        setJob({ id: jobDoc.id, ...jobDoc.data() });
      }

      // Fetch applications for this job
      const q = query(collection(db, 'applications'), where('jobId', '==', jobId));
      const querySnapshot = await getDocs(q);
      setApplications(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchJobAndApplications();
  }, [jobId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p>{job.description}</p>
      <h2 className="text-xl font-semibold">Applications</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Applicant</th>
            <th className="border p-2">Match Score</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td className="border p-2">{app.applicantName}</td>
              <td className="border p-2">{app.matchScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}