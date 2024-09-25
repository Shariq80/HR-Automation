// src/components/AdminDashboard.js
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link'; 

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const jobsSnapshot = await getDocs(collection(db, 'jobs'));
        const applicationsSnapshot = await getDocs(collection(db, 'applications'));

        setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setJobs(jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setApplications(applicationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, 'jobs', jobId));
      // Update the jobs state after deleting
      setJobs(jobs.filter(job => job.id !== jobId)); 
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1> 

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">HR</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="border p-2">{job.title}</td>
                <td className="border p-2">{job.hrId}</td>
                <td className="border p-2">
                  {job.createdAt ? job.createdAt.toDate().toLocaleString() : 'N/A'}
                </td>
                <td className="border p-2">
                  <button 
                    onClick={() => handleDeleteJob(job.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
                    Delete
                  </button>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Applications</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Applicant</th>
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Match Score</th>
              <th className="border p-2">Status</th> 
              <th className="border p-2">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="border p-2">{app.applicantName}</td>
                <td className="border p-2">{app.jobTitle}</td> 
                <td className="border p-2">{app.matchScore}</td>
                <td className="border p-2">{app.status}</td> 
                <td className="border p-2">
                  <Link href={`/applications/${app.id}`}> 
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm mr-2">
                      View
                    </button>
                  </Link>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// import { useState, useEffect } from 'react';
// import { db } from '../lib/firebase';
// import { collection, getDocs } from 'firebase/firestore';

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Fetch users
//       const usersSnapshot = await getDocs(collection(db, 'users'));
//       setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//       // Fetch jobs
//       const jobsSnapshot = await getDocs(collection(db, 'jobs'));
//       setJobs(jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Users</h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id}>
//                 <td className="border p-2">{user.email}</td>
//                 <td className="border p-2">{user.role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Jobs</h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Title</th>
//               <th className="border p-2">HR</th>
//               <th className="border p-2">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map(job => (
//               <tr key={job.id}>
//                 <td className="border p-2">{job.title}</td>
//                 <td className="border p-2">{job.hrId}</td>
//                 <td className="border p-2">{job.createdAt.toDate().toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }