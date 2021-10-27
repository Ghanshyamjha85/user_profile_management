const { UserProfile }  = require("../models/user_profile")
const express   = require("express")
const app       = express()
const bcrypt    = require("bcrypt")


app.post('', async (req, res) => {

    //Checking if request body has all required fields
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.confirm_password || !req.body.role) 
        {
            return res.status(400).send("Bad Request")
        }
     
    //Checking if user is already registered
    var user = await UserProfile.findOne({email: req.body.email})
    if (user) return res.status(400).send("User is Already Registerd")

    //Checking if password is matching
    if (req.body.password !== req.body.confirm_password) {
        return res.send(400).send("Password Doesn't Match")
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


//Function to encrypt password
encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hahsedPassword = await bcrypt.hash(password, salt)
    return hahsedPassword
}

module.exports = app
