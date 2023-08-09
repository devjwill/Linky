const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
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
        type: String
    }
})


//Signup Function
userSchema.statics.signup = async function (firstName, lastName, email, password, username, profilePicture) {
    //Validation
    if(!firstName || !email || !password || !username) {
        throw Error("All required fields must be filled.")
    }
    if(firstName.trim() === "" || /^[A-Za-z]+(?:[-']{1}(?![\s'-]))?[A-Za-z]+$/.test(firstName)) {
        throw Error("Input a valid first name")
    }
    if(firstName.length > 50) {
        throw Error("Maximum character length for name is 50")
    }
    if(!validator.isEmail(email)) {
        throw Error("Email is not valid.")
    }
    if(!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough.")
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

    const user = await this.create({ firstName, lastName, email, password: hash, username, profilePicture }) // add profile pic
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