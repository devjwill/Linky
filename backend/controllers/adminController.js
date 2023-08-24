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
    const { id } = req.params
    const { title, url, thumbnail, visible } = req.body

    if (!id) {
        return res.status(400).json({error: '_id parameter is missing'})
    }

    const link = await Link.find({ _id: id })
    if (!link) {
        return res.status(404).json({error: 'Link not found'})
    }

    if (title === "" || url === "") {
        return res.status(400).json({error: 'This field cannot be empty.'})
    }

    let newLink

    if (title) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { title } }, { returnOriginal: false })
    } else if (url) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { url } }, { returnOriginal: false })
    } else if (thumbnail) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { thumbnail } }, { returnOriginal: false })
    } else if (visible) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { visible } }, { returnOriginal: false })
    } else if(!newLink) {
        return res.status(400).json({error: 'No changes made'})
    }

    res.status(200).json(newLink)
}

const deleteLink = async (req, res) => {
    console.log('deleting a link')
    const { username } = req.params
    const { url } = req.body
    if (!username) {
        res.status(400).json({error: "Username parameter is missing."})
    }
    const user = await User.find({ username })
    if (!user) {
        res.status(404).josn({error: 'User not found'})
    }

    const userID = user[0]._id

    const deletedLinkFromLink = await Link.findOneAndDelete({user: userID, url})
    if(!deletedLinkFromLink) {
        res.status(404).json({error: 'Link not found in links collection'})
    }

    const linkID = deletedLinkFromLink._id

    const deletedLinkFromUser = await User.updateOne({ username }, { $pull: { ["links"]: { $in: linkID } } })

    if (deletedLinkFromUser.matchedCount !== 1) {
        res.status(404).json({error: "Link not found in user's collection"})
    }


    res.status(200).json(deletedLinkFromLink)
}

module.exports = { getAdmin, getUserData, createLink, editLink, deleteLink }