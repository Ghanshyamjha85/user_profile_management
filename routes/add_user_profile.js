const { UserProfile }  = require("../models/user_profile")
const express   = require("express")
const app       = express()
const {encryptPassword} = require("../middlewere/auth")
const jwt  = require('jsonwebtoken')

app.post('', async (req, res) => {

    //Checking if request body has all required fields
    if (!req.body.token || !req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.confirm_password || !req.body.role) 
        {
            return res.status(400).send("Bad Request")
        }

    //User can't add Admin
    var { role } = jwt.decode(req.body.token)
    if (role === 'user' && req.body.role === 'admin') {
        return res.status(401).send("Unauthorised")
    }
     
    //Checking if user is already registered
    var user = await UserProfile.findOne({email: req.body.email})
    if (user) return res.status(400).send("User is Already Registerd")

    //Check if password is between 6-12 characters or not

    if ( req.body.password.length < 6 || req.body.password.length > 12) {
        res.status(400).send("Password must be between 6 to 12 character")
    }


    //Checking if password is matching
    if (req.body.password !== req.body.confirm_password) {
        return res.status(400).send("Password Doesn't Match")
    }

    //creating new user object
    user = new UserProfile({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role : req.body.role,
        department : req.body.department
    })

    //Hashing Password
    user.password = await encryptPassword(user.password)

    //Saving user to database
    try {
        await user.save()
        return res.send(user)

    }
    catch(e) {
        return res.send(e.message)
    }

})

module.exports = app
