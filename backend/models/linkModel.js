const mongoose = require('mongoose')

const Schema = mongoose.Schema

const linkSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    thumbnail: {
        type: String,
        default: null
    },
    visible: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Link', linkSchema)