const { UserProfile } = require("../models/user_profile")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

app.post('', async (req, res) => {

    //Checking if request body contains all the required fields
    if (!req.body.email || !req.body.password) return res.status(400).send("Bad Request")

    //Checking if user with given email is found or not
    var user = await UserProfile.findOne({ email: req.body.email })
    if (!user) return res.status(401).send("Email or Passord is Invalid!!")

    //Checking if password is correct or not
    var validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).send("Email or Passord is Invalid!!")

    //generating JWT Token and returning it to user
    var token = generageToken(user)
    return res.send(token)
})


// Function to Generate JWT
generageToken = (user) => {

    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role : user.role
        },
        process.env.SECRET_KEY,
    )

    var res = {
        "token": token,
    }
    return res
}

module.exports = app
