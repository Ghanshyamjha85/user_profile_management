const express   = require("express")
const app       = express() 
const mongoose  = require("mongoose")


//importing .env file. (.env) file makes our database URI and secret keys safe.
require("dotenv").config()



/************** Database Connectivity ****************/
mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log("Connected to mongoDB"))
    .catch( (error) => {
        console.log("Unable to connect to mongoDB")
        console.log(error);
        process.exit(1)
    })
/***************************************************/


/*********** Running server on 3000 port ************** */
app.listen( 3000, () => console.log("Running on port 3000"))