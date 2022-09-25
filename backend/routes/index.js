// Application endpoints index

const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))
router.use('/professional', require('./professional'))

// router.use('/api-docs', require('./swagger'));

module.exports = router;