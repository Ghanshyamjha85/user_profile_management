const { UserProfile } = require("../models/user_profile")
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
require('dotenv').config();

app.put('', async (req, res) => {

    //Checking if request body contains all the required fields
    if (!req.body.token) return res.status(400).send("Bad Request")

    // Decoding Token
    var decode = jwt.decode(req.body.token)

    //Checking if token contain email field or not
    if (!decode.email) return res.status(400).send("Unauthorised Access")
    
    //Checking if user with given email is found or not
    var user = await UserProfile.findOne({email: decode.email})
    if (!user) return res.status(400).send("email not found!!")

    //Checking if request send by admin or user
    if (user.role == 'admin') {

        //getting list of users
        var result = await UserProfile.findById(req.body.id)

        if (result.length === 0) {
            return res.status(400).send("User not found")
        }
        //Admin can view his own account and other users account
        if (result.role ==='user' || result._id.equals(user._id)){
            result = await UserProfile.updateOne({_id : result._id}, {
                ...req.body.upateList
            })
            return res.send(result)
        }
        else {
            return res.status(401).send("Unauthorised")
            
        }
    }

    else {

        var result = await UserProfile.findById(req.body.id)
        if (result.length === 0) {
            return res.status(400).send("User not found")
        }
        //User can view his own account only
        if (result.role ==='user' && result._id.equals(user._id)){
            result = await UserProfile.updateOne({_id : result._id}, {
                ...req.body.updateList
            })
            return res.send(result)
        }
        else {
            return res.status(401).send("Unauthorised Access")
            
        }
    }
})



module.exports = app
