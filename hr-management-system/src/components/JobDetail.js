// frontend/src/components/JobDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import { getApplicationsByJobId } from '../services/applicationService';
import { Link } from 'react-router-dom';

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      const jobData = await getJobById(jobId);
      setJob(jobData);

      const applicationsData = await getApplicationsByJobId(jobId);
      setApplications(applicationsData);
    };
    fetchJob();
  }, [jobId]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>Location: {job.location}</p>
  
      <h3>Applications</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Match Score</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td>{application.email}</td>
              <td>{application.matchScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <Link to={`/jobs/${jobId}/apply`}>
        <button>Apply for this Job</button>
      </Link>
    </div>
  );
};
export default JobDetail;