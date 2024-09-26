// backend/controllers/jobController.js
const Job = require('../models/Job');
const Application = require('../models/Application');
const gmailApi = require('../utils/gmailApi');
const geminiApi = require('../utils/geminiApi');

// Create a new job posting
exports.createJob = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      location,
    });

    await newJob.save();

    // Fetch emails related to job applications
    const emails = await gmailApi.fetchEmails();
    for (const email of emails) {
      const { from, snippet, payload } = email;
      const resumeText = payload.parts[0].body.data; // Extract resume text from email

      // Calculate match score using Gemini API
      const matchScore = await geminiApi.calculateMatchScore(description, resumeText);

      const newApplication = new Application({
        jobId: newJob._id,
        userId: req.user.userId,
        email: from,
        resume: resumeText,
        matchScore,
      });

      await newApplication.save();
    }

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single job by ID
exports.getJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, location } = req.body;

  try {
    const job = await Job.findByIdAndUpdate(
      id,
      { title, description, location },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

