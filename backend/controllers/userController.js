const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

//Create JSON Web Token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '7d'})
}

//Login User
const loginUser = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({error: error.toString()})
    }
}

//Signup User
const signupUser = async (req, res) => {
    const { firstName, lastName, email, password, username, profilePicture } = req.body
    try {
        const user = await User.signup(firstName, lastName, email, password, username)
        const token = createToken(user._id)
        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signupUser }