// const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Link = require('../models/linkModel')
const mongoose = require('mongoose')

const getAdmin = async (req, res) => {
    console.log('get ' + req.path)
    res.status(200)
}

const getUserData = async (req, res) => {
    console.log('geting user data')
    const { username } = req.params
    if (!username) {
        return res.status(400).json({ error: "Username parameter is missing." })
    }
    const user = await User.find({ username })
    if (!user) {
        return res.status(404).json({ error: "User not forund." })
    }

    const linkData = await Link.find({ user: user[0]._id })
    if (!linkData) {
        return res.status(400).json({error: "Link data not found"})
    }

    const userData = {
        user: user[0],
        links: linkData
    }

    res.status(200).json(userData)
}

const createLink = async (req, res) => {
    console.log('creating a new link')
    const { username } = req.params
    const { url, title } = req.body
    if (!username) {
        return res.status(400).json({ error: "Username parameter is missing." })
    }
    const user = await User.find({ username })
    if (!user) {
        return res.status(400).json({error: 'User not found.'})
    }
    const duplicate = await Link.find({ user: user[0]._id, url: url })
    if (duplicate.length >= 1) {
        return res.status(400).json({error: 'Duplicate url.'})
    }

    try {
        const newLink = new Link({user: user[0]._id, url, title})
        newLink.save()
        .then(link => {
            return User.findByIdAndUpdate(user[0]._id, { $push: { links: link._id  } }, { new: true })
        })
        res.status(200).json(newLink)
    } catch (error) {
        console.log('Error: ', error)
    }
}

const editLink = async (req, res) => {
    console.log('editing a link')
    res.status(200)
}
const deleteLink = async (req, res) => {
    console.log('deleting a link')
    res.status(200)
}

module.exports = { getAdmin, getUserData, createLink, editLink, deleteLink }