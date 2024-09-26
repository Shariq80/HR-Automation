// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.authenticate);

router.post('/', authMiddleware.authorize(['hr', 'admin']), jobController.createJob);
router.get('/', authMiddleware.authorize(['hr', 'admin']), jobController.getJobs);
router.get('/:id', authMiddleware.authorize(['hr', 'admin']), jobController.getJob);
router.put('/:id', authMiddleware.authorize(['hr', 'admin']), jobController.updateJob);
router.delete('/:id', authMiddleware.authorize(['admin']), jobController.deleteJob);

module.exports = router;