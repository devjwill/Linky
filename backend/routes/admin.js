const express = require('express');
const requireAuth = require('../middleware/requireAuth')

//Controller Functions
const { getAdmin } = require('../controllers/adminController');

const router = express.Router();

//Require authorization
router.use(requireAuth)

//GET admin page
router.get('/admin', getAdmin);

module.exports = router