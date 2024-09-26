// backend/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authenticate);

router.get('/jobs/:jobId/applications', authMiddleware.authorize(['hr', 'admin']), applicationController.getApplicationsByJobId);
router.put('/:applicationId', authMiddleware.authorize(['hr', 'admin']), applicationController.updateMatchScore);
router.delete('/:applicationId', authMiddleware.authorize(['admin']), applicationController.deleteApplication);

module.exports = router;