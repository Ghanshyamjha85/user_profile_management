const { UserProfile } = require("../models/user_profile")
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
require('dotenv').config();

app.post('', async (req, res) => {

    //Checking if request body contains all the required fields
    if (!req.body.token) return res.status(400).send("Bad Request")

    // Decoding Token
    var {email} = jwt.decode(req.body.token)

    //Checking if token contain email field or not
    if (!email) return res.status(400).send("Unauthorised Access")
    
    //Checking if user with given email is found or not
    var user = await UserProfile.findOne({email})
    if (!user) return res.status(400).send("email not found!!")

    //Checking if request send by admin or user
    //Admin can view himself and users
    if (user.role == 'admin') {

        //getting list of users
        var result = await UserProfile.find()

        //checking if 'field' is given in request then only that will be viewed
        if (req.body.field) {
            result = result.map( (res) => {return res[req.body.field]})
        }
            return res.send(result)
    }
    //user can view only his account
    else {
        var result = await UserProfile.find({role:'user'})
        if (req.body.field) {
            result = result.map( (res) => {return res[req.body.field]})
        }
        return res.send(result)
    }
})

module.exports = app
