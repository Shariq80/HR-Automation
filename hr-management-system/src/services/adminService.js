import axios from 'axios';

export const getUsers = async (token) => {
  const response = await axios.get('/api/admin/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getJobs = async (token) => {
  const response = await axios.get('/api/jobs', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getApplications = async (token) => {
  const response = await axios.get('/api/applications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};