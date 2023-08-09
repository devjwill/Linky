
const getHome = async (req, res) => {
    console.log('get ' + req.path)
    res.status(200)
}

const getTemplates = async (req, res) => {
    console.log('get ' + req.path)
    res.status(200)
}

const getFAQ = async (req, res) => {
    console.log('get ' + req.path)
    res.status(200) 
}

const getContactUs = async (req, res) => {
    console.log('get ' + req.path)
    res.status(200)
}

module.exports = { getHome, getTemplates, getFAQ, getContactUs };