import axios from 'axios';

export const getApplicationsByJobId = async (jobId, token) => {
  const response = await axios.get(`/api/applications/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createApplication = async (applicationData, token) => {
  const response = await axios.post('/api/applications', applicationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getApplications = async (token) => { // Add the export keyword
  const response = await axios.get('/api/applications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};