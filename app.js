const express   = require("express")
const app       = express() 
const mongoose  = require("mongoose")


//importing .env file. (.env) file makes our database URI and secret keys safe.
require("dotenv").config()

// Importing Routes
const add_user_profile = require("./routes/add_user_profile")
const login = require("./routes/login_user")
const view = require("./routes/view_user")
const update = require('./routes/update_users')


/************** Database Connectivity ****************/
mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log("Connected to mongoDB"))
    .catch( (error) => {
        console.log("Unable to connect to mongoDB")
        console.log(error);
        process.exit(1)
    })
/***************************************************/

// Parsing Incoming request to Json Object
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Using Routes
app.use("/new_user", add_user_profile)
app.use("/login", login)
app.use('/view', view)
app.use('/update', update)


/*********** Running server on 3000 port ************** */
app.listen( 3000, () => console.log("Running on port 3000"))