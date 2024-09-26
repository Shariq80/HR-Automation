// frontend/src/components/JobPostingForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../services/jobService';
import { useAuth } from '../services/authService';

const JobPostingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob({ title, description, location });
      navigate('/dashboard');
    } catch (error) {
      console.error('Job creation failed', error);
    }
  };

  return (
    <div>
      <h2>Create a New Job Posting</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default JobPostingForm;