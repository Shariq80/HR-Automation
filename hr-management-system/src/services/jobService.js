import axios from 'axios';

export const getJobsByUser = async (token) => {
  const response = await axios.get('/api/jobs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createJob = async (jobData, token) => {
  const response = await axios.post('/api/jobs', jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getJobById = async (jobId, token) => {
  const response = await axios.get(`/api/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getJobs = async (token) => { // Add the export keyword
  const response = await axios.get('/api/jobs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};