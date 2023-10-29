const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Link = require('./linkModel')

const Schema = mongoose.Schema

// Schema that contains each of the user's link objects in an array
// const parentSchema = new Schema({
//     links: []
// })

//Schema that holds user's data
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: ""
    },
    appearance: {
        background: {
            type: String,
            default: '#808080'
        },
        profileTitle: {
            type: String,
            default: ''
        },
        buttons: {
            fontColor: {
                type: String,
                default: 'black'
            },
            color: {
                type: String,
                default: 'white'
            },
            shadowColor: {
                type: String,
                default: 'black'
            },
            design : {
                type: String,
                default: 'rectangle-fill'
            }
        },
        font: {
            fontColor: {
                type: String,
                default: 'white'
            },
            fontFamily: {
                type: String,
                default: 'inter'
            }
        }
    },
    // linksData: {
    //     type: parentSchema,
    //     default: {}
    // } 
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link'
    }]
})

//Signup Function
userSchema.statics.signup = async function (firstName, lastName, email, password, username, profilePicture) {
    //Validation
    if(!firstName || !email || !password || !username) {
        throw Error("All required fields must be filled.")
    }
  
    const regex = /^[\p{L}']+$/u //Regex for different alphabets
    //First name validation
    if(firstName.includes(`'`)) {
        throw Error("Please input a valid first name")
    }
    if(!validator.isAlpha(firstName)) {
        if(!validator.matches(firstName, regex)) {
            throw Error("Please input a valid first name")
        }
    }
    if(firstName.length > 15) {
        throw Error("Maximum character length for name is 15")
    }

    //Last name validation
    if(lastName) {
        if(lastName.includes(`'`)) {
            throw Error("Please input a valid last name")
        }
        if(!validator.isAlpha(lastName)) {
            if(!validator.matches(lastName, regex)) {
                throw Error("Please input a valid last name")
            }
        }
        if(lastName.length > 15) {
            throw Error("Maximum character length for a name is 15")
        }
    }

    //Email validation - real email
    if(!validator.isEmail(email)) {
        throw Error("Email is not valid.")
    }

    //Password validaton - strong password
    if(!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough.")
    }

    //Username validation - max length
    if(username.length > 20) {
        throw Error("Maximum character length for username is 20")
    }

    const usernameRegex = /^[A-Za-z0-9_]*[A-Za-z][A-Za-z0-9_]*$/
    if (!usernameRegex.test(username)) {
        throw Error("Username only accepts A-Z, 0-9, and _")
    }


    //Email and Username uniqueness
    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })

    if (emailExists && usernameExists) {
        throw Error("Email and Username are already in use.")
    }
    // ****************************** Order of these if statements may cause issues *******************************************************
    if (emailExists) {
        throw Error("This email is already in use.")
    }
    if (usernameExists) {
        throw Error("This username is already in use.")
    }
    //*************************************************************************************************************************************** 

    //Encrypting Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ firstName, lastName, email, password: hash, username, profilePicture  }) // add profile pic
    return user
}

//Login Function
userSchema.statics.login = async function (username, password) {
    if (!username || !password) {
        throw Error("Please enter a username and password.")
    }

    //Validating username
    const usernameExists = await this.findOne({ username })
    if (!usernameExists) {
        throw Error("Incorrect username")
    }

    //Validating password
    const match = await bcrypt.compare(password, usernameExists.password)
    if(!match) {
        throw Error("Incorrect password")
    }

    return usernameExists
}

module.exports = mongoose.model('User', userSchema)