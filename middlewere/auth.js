const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//Function to encrypt password
exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hahsedPassword = await bcrypt.hash(password, salt)
    return hahsedPassword
}

// Function to Generate JWT
exports.generageToken = (user) => {

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
