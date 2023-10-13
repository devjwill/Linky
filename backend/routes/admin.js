const express = require('express');
const requireAuth = require('../middleware/requireAuth')

//Controller Functions
const { getAdmin, getUserData, createLink, editLink, deleteLink, editOrder, getLinkData, patch } = require('../controllers/adminController');

const router = express.Router();

//Require authorization
router.use(requireAuth)

//Get all links
router.get('/:username', getUserData)

//create a new link
router.post('/:username', createLink)

//PATCH Requests
router.patch('/patch', patch)


//delete a link
router.delete('/:username', deleteLink)


//GET admin page
router.get('/admin', getAdmin);

module.exports = router