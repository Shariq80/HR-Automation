// frontend/src/components/Apply.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createApplication } from '../services/applicationService';
import { useAuth } from '../services/authService';

const Apply = () => {
  const { jobId } = useParams();
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createApplication({ jobId, email, resume });
      navigate('/dashboard');
    } catch (error) {
      console.error('Application submission failed', error);
    }
  };

  return (
    <div>
      <h2>Apply for the Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Resume:</label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default Apply;