// frontend/src/components/AdminPortal.js
import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/adminService';
// import { getJobs } from '../services/jobService';
// import { getApplications } from '../services/applicationService';
import { getJobs, getApplications } from '../services/adminService'; // Import correctly
import { Link } from 'react-router-dom';

const AdminPortal = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const usersData = await getUsers();
      setUsers(usersData);

      const jobsData = await getJobs();
      setJobs(jobsData);

      const applicationsData = await getApplications();
      setApplications(applicationsData);
    };
    fetchAdminData();
  }, []);

  if (!users || !jobs || !applications) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Portal</h2>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>{user.name} ({user.email}) - {user.role}</p>
          </li>
        ))}
      </ul>
  
      <h3>Jobs</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <Link to={`/jobs/${job._id}/applications`}>
              <button>View Applications</button>
            </Link>
          </li>
        ))}
      </ul>
  
      <h3>Applications</h3>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Email</th>
            <th>Match Score</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td>{application.jobId.title}</td>
              <td>{application.email}</td>
              <td>{application.matchScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {/* Add buttons to manage jobs and applications */}
      <Link to="/jobs/create">
        <button>Create New Job</button>
      </Link>
      <Link to="/applications/manage">
        <button>Manage Applications</button>
      </Link>
    </div>
  );
};

export default AdminPortal;