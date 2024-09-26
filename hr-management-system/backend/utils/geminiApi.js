// backend/utils/geminiApi.js
const axios = require('axios');

async function calculateMatchScore(jobDescription, resumeText) {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = 'https://api.gemini.google.com/v1/matchScore';

  const data = {
    jobDescription,
    resumeText,
  };

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.matchScore;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { calculateMatchScore };