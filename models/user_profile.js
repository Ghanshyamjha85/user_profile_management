var mongoose = require("mongoose")
var { Schema, model } = mongoose  //extracting Schema, model form mongoose

//Creating user_profile  schema
var user_profile = new Schema({
    
    // Firstname is required and between 3-30 character
    firstname : {
        type: String,
        required: true,
        minlength: 3, 
        maxlength: 30
    },  

    // Middlename is not required 
    middlename : {
        type: String,
        maxlength: 30
    }, 

    //Lastname is required and should between 1-30 character
    lastname : {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 30
    },  
    //Email is requierd,unique and should between 3-320 character
    email: {
        type: String,
        required:true,
        unique: true,
        index: true,
        minlength: 3,
        maxlength: 320,
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] // This is regex to validate email
    },

    //Password is required
    //Here we don't store real password, instead hashed password will be stored.
    password: {
        type: String,
        required: true,
        maxlength: 256,
        select : false
    },

    // Role is string and it can have only two value either 'user' and 'admin'
    role : {
        type: String,
        required: true,
        enum : ['user','admin'],//Enum checks if the value entered available in given array
        default: 'user'
    },
    // Department is not required and should be less than 256 character
    department : {
        type: String,
        maxlength: 256
    }
},
 //createdAt adn deletedAt will be added to database
 {timestamps: true})

//Exporting model
exports.UserProfile = model("user_profile", user_profile)
