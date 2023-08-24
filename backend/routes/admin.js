const express = require('express');
const requireAuth = require('../middleware/requireAuth')

//Controller Functions
const { getAdmin, getUserData, createLink, editLink, deleteLink } = require('../controllers/adminController');

const router = express.Router();

//Require authorization
router.use(requireAuth)

//Get all links
router.get('/:username', getUserData)

//create a new link
router.post('/:username', createLink)

//update a link
router.patch('/:id', editLink)

//delete a link
router.delete('/:username', deleteLink)

//GET admin page
router.get('/admin', getAdmin);

module.exports = router