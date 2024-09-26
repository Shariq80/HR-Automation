// backend/controllers/applicationController.js
const Application = require('../models/Application');

// Get all applications for a specific job
exports.getApplicationsByJobId = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.find({ jobId }).populate('userId');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update match score for an application
exports.updateMatchScore = async (req, res) => {
  const { applicationId } = req.params;
  const { matchScore } = req.body;

  try {
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { matchScore },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an application
exports.deleteApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await Application.findByIdAndDelete(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};