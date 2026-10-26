const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const tripRoutes = require('./tripRoutes');
const destinationRoutes = require('./destinationRoutes');
const activityRoutes = require('./activityRoutes');
const reviewRoutes = require('./reviewRoutes');
const blogRoutes = require('./blogRoutes');
const faqRoutes = require('./faqRoutes');
const inquiryRoutes = require('./inquiryRoutes');
const siteContentRoutes = require('./siteContentRoutes');
const uploadRoutes = require('./uploadRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);
router.use('/destinations', destinationRoutes);
router.use('/activities', activityRoutes);
router.use('/reviews', reviewRoutes);
router.use('/blogs', blogRoutes);
router.use('/faqs', faqRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/content', siteContentRoutes);
router.use('/upload', uploadRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Travels API Backend',
  });
});

module.exports = router;
