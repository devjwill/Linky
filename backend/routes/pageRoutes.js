const express = require('express');
const User = require('../models/userModel')

//Controller Functions

const router = express.Router()

router.get('/:username', async (req, res) => {
    const username = req.params.username
    try {
        const user = await User.findOne({ username }, { username: 1, profilePicture: 1, appearance: 1, links: 1, bio: 1, views: 1 })
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(400)
    }
})

// router.patch()

module.exports = router