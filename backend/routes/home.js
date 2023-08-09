const express = require('express');

//Controller Functions
const { getHome, getTemplates, getFAQ, getContactUs } = require('../controllers/homeController');
const router = express.Router();

//Home
router.get('/home', getHome);

//Templates
router.get('/templates', getTemplates);

//Frequently Asked Questions
router.get('/faq', getFAQ);

//Contact Us
router.get('/contact-us', getContactUs);

module.exports = router