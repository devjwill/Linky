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
    const _id = user[0]._id

    if (user[0].links.length < 1) {
      const userData = {
        user: user[0],
        links: []
      }
      res.status(200).json(userData)
    } else {


    const linkData = await User.aggregate([
        {
          $match: {
            _id // Replace with the user's ID you're interested in.
          }
        },
        {
          $lookup: {
            from: "links",
            localField: "links",
            foreignField: "_id",
            as: "userLinks"
          }
        },
        {
          $unwind: "$userLinks"
        },
        {
          $addFields: {
            sortIndex: {
              $indexOfArray: ["$links", "$userLinks._id"]
            }
          }
        },
        {
          $sort: {
            sortIndex: 1 // Sorting in ascending order based on the sortIndex.
          }
        },
        {
          $group: {
            _id: "$_id",
            sortedLinks: {
              $push: "$userLinks"
            }
          }
        },
        {
          $project: {
            _id: 0,
            sortedLinks: 1
          }
        }
      ]);

    // const linkData = await Link.find({ user: user[0]._id }).sort({ _id: -1 })
    // if (!linkData) {
    //     return res.status(400).json({error: "Link data not found"})
    // }
      const userData = {
        user: user[0],
        links: linkData[0].sortedLinks
      }
      res.status(200).json(userData)
    }
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
            // return User.findByIdAndUpdate(user[0]._id, { $push: { links: { $each: [link._id]},   } }, { new: true })
            return User.findByIdAndUpdate(user[0]._id, { $push: { links: { $each: [link._id], $position: 0 } } }, { returnOriginal: false } )
        })
        res.status(200).json(newLink)
    } catch (error) {
        console.log('Error: ', error)
    }
}

const editLink = async (req, res) => {
    console.log('editing a link')
    const { id, content } = req.body

    if (!id) {
        return res.status(400).json({error: '_id parameter is missing'})
    }

    const link = await Link.find({ _id: id })
    if (!link) {
        return res.status(404).json({error: 'Link not found'})
    }

    if (content.title === "" || content.url === "") {
        return res.status(400).json({error: 'This field cannot be empty.'})
    }

    let newLink

    if (content.title && link[0].title !== content.title) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { title: content.title } }, { returnOriginal: false })
    } else if (content.url && link[0].url !== content.url) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { url: content.url } }, { returnOriginal: false })
    } else if (content.thumbnail) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { thumbnail: content.thumbnail } }, { returnOriginal: false })
    } else if (content.visible != null) {
        newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { visible: content.visible } }, { returnOriginal: false })
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

const patch = async (req, res) => {
    if (req.body.content && req.body.id) { //Edit link data
        const { id, content } = req.body

        if (!id) {
            return res.status(400).json({error: '_id parameter is missing'})
        }
    
        const link = await Link.find({ _id: id })
        if (!link) {
            return res.status(404).json({error: 'Link not found'})
        }
    
        if (content.title === "" || content.url === "") {
            return res.status(400).json({error: 'This field cannot be empty.'})
        }
    
        let newLink
    
        if (content.title && link[0].title !== content.title) {
            newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { title: content.title } }, { returnOriginal: false })
        } else if (content.url && link[0].url !== content.url) {
            newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { url: content.url } }, { returnOriginal: false })
        } else if (content.thumbnail) {
            newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { thumbnail: content.thumbnail } }, { returnOriginal: false })
        } else if (content.visible != null) {
            newLink = await Link.findOneAndUpdate({ _id: id }, { $set: { visible: content.visible } }, { returnOriginal: false })
        } else if(!newLink) {
            return res.status(400).json({error: 'No changes made'})
        }
    
        res.status(200).json(newLink)
    } else if (req.body.username && req.body.userLinks) { //Edit link order
      const { username, userLinks } = req.body

      const user = await User.find({ username })
      if (!user) {
        res.status(404).json({error: "Username cant be found"})
      }

      const updatedUserLinks = await User.updateOne({ username }, { $set: { links: userLinks } }, { returnOriginal: false })
      
      if (updatedUserLinks) {
        res.status(200)
      } else {
        res.status(400).json({error: "Failed to updated user's link array"})
      }

    } else if (req.body.username && req.body.background) { //Edit background
      const { username, background } = req.body
      const updatedBackground = await User.findOneAndUpdate({ username }, { $set: { "appearance.background": background } }, { returnOriginal: false })
      if (updatedBackground) {
        res.status(200).json(updatedBackground.appearance.background)
      }
    } else if (req.body.username && req.body.profileTitle) { //Edit profile title
      console.log("editing profile title")
      const { username, profileTitle } = req.body
      const updatedProfileTitle = await User.findOneAndUpdate({ username }, { $set: { "appearance.profileTitle": profileTitle } }, { returnOriginal: false } )
      if (updatedProfileTitle) {
        res.status(200).json(updatedProfileTitle.appearance.profileTitle)
      } else {
        res.status(400).json({error: "Failed to make changes to profile title"})
      }
    } else if (req.body.username && req.body.bio) { //Edit bio
      const { username, bio } = req.body
      const updatedBio = await User.findOneAndUpdate({ username }, { $set: { bio } }, { returnOriginal: false })
      if (updatedBio) {
        res.status(200).json(updatedBio.bio)
      } else {
        res.status(400).json({error: "Failed to make change to bio"})
      }
    } else if (req.body.username && req.body.profilePicture) { //Edit profile picture
      const { username, profilePicture } = req.body
      let updatedProfilePicture
      if (profilePicture === "x") {
        updatedProfilePicture = await User.findOneAndUpdate({ username }, { $set: { profilePicture: '' } },  { returnOriginal: false })
      } else {
        updatedProfilePicture = await User.findOneAndUpdate({ username }, { $set: { profilePicture } },  { returnOriginal: false })
      }
      
      if (updatedProfilePicture) {
        res.status(200).json(updatedProfilePicture.profilePicture)
      } else {
        res.status(400).json({error: 'Failed to make change to profile picture'})
      }
    } else if (req.body.username && req.body.design) { //Edit button design
      const { username, design } = req.body
      const updatedButtonDesign = await User.findOneAndUpdate({ username }, { $set: { "appearance.buttons.design": design } }, { returnOriginal: false })

      if (updatedButtonDesign) {
        res.status(200).json(updatedButtonDesign.appearance.buttons.design)
      } else {
        res.status(400).json({error: 'Failed to make change to button design'})
      }
    } else if (req.body.username && req.body.btnColor) { //Edit button color
      const { username, btnColor } = req.body
      const updatedButtonColor = await User.findOneAndUpdate({ username }, { $set: { "appearance.buttons.color": btnColor } }, { returnOriginal: false })

      if (updatedButtonColor) {
        res.status(200).json(updatedButtonColor.appearance.buttons.color)
      } else {
        res.status(400).json({error: 'Failed to make change to button color'})
      }
    } else if (req.body.username && req.body.btnShadowColor) { // Edit button shadow color
      const { username, btnShadowColor } = req.body
      const updatedButtonShadowColor = await User.findOneAndUpdate({ username }, { $set: { "appearance.buttons.shadowColor": btnShadowColor } }, { returnOriginal: false })

      if (updatedButtonShadowColor) {
        res.status(200).json(updatedButtonShadowColor.appearance.buttons.shadowColor)
      } else {
        res.status(400).json({error: 'Failed to make change to button shadow color'})
      }
    } else if (req.body.username && req.body.btnFontColor) { // Edit button font color
      const { username, btnFontColor } = req.body
      const updatedButtonFontColor = await User.findOneAndUpdate({ username }, { $set: { "appearance.buttons.fontColor": btnFontColor } }, { returnOriginal: false })

      if (updatedButtonFontColor) {
        res.status(200).json(updatedButtonFontColor.appearance.buttons.fontColor)
      } else {
        res.status(400).json({error: 'Failed to make change to button font color'})
      }
    }
}

module.exports = { getAdmin, getUserData, createLink, editLink, deleteLink, patch }