// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authenticate);

router.get('/users', authMiddleware.authorize(['admin']), adminController.getUsers);
router.get('/jobs', authMiddleware.authorize(['admin']), adminController.getJobs);
router.get('/applications', authMiddleware.authorize(['admin']), adminController.getApplications);

module.exports = router;