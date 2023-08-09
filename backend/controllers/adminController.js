const jwt = require('jsonwebtoken')

const getAdmin = async (req, res) => {
    console.log('get ' + req.path)
    res.status(200)
}

module.exports = { getAdmin }