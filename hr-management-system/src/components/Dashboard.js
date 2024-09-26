import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/authService';
import { getJobsByUser } from '../services/jobService';
import { getApplicationsByJobId } from '../services/applicationService';

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userJobs = await getJobsByUser(token);
      setJobs(userJobs);

      const jobApplications = await Promise.all(
        userJobs.map(async (job) => {
          const applications = await getApplicationsByJobId(job._id, token);
          return { job, applications };
        })
      );
      setApplications(jobApplications);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Job Postings</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <h4>Applications</h4>
            <ul>
              {applications
                .find((item) => item.job._id === job._id)
                ?.applications.map((application) => (
                  <li key={application._id}>
                    <p>Email: {application.email}</p>
                    <p>Match Score: {application.matchScore}</p>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;