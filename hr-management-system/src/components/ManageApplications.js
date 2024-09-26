// frontend/src/components/ManageApplications.js
import React, { useState, useEffect } from 'react';
import { getApplications } from '../services/applicationService'; // Import correctly

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const applicationsData = await getApplications();
      setApplications(applicationsData);
    };
    fetchApplications();
  }, []);

  if (!applications) return <div>Loading...</div>;

  return (
    <div>
      <h2>Manage Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Email</th>
            <th>Match Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td>{application.jobId.title}</td>
              <td>{application.email}</td>
              <td>{application.matchScore}</td>
              <td>
                {/* Add action buttons here, e.g., approve, reject */}
                <button>Approve</button>
                <button>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageApplications;