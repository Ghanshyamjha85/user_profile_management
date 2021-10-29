Steps to Run appliation:
    1. npm install
    2. node app.js

Application will start running at port no. 3000

To test the application use postman

Available Routes:

1. http://localhost:3000/adduser (POST)

    Fields for this route: 

        {
            token: "Json webtoken",
            firstname: "required",
            middlename: " not required",
            lastname: "required",
            "email" : "unique not null",
            password : "required min 6 max 12"
            confirmpassword: " required should be equal to password"
            role: " [user, admin]"
            department: " not required'
        }

    response:
        If successfuly create user then returns new user object otherwise error message with relevent status code

    constraint:
        An admin can create admin as well as user
        A user can create only admin

2. http://localhost:3000/login  (POST)
    
    fields for this route: 
        {
            email : "email id of uses",
            password: "password of user"
        }

    response:
        if email id found in database and corresponding password matches then returns json web token otherwise returns error object with relevant status code and message

3. http://localhost:3000/view   (POST)

        fields for this route: 

        {
            token: "json web token",
            field : "optional"
        }

        response:
            If token is valid then it will return users present in database. If field is given then only that field of user will be returned other all fields accept password

        constrains:
            An admin can view details of all the users
            A user can view details of users only

4. http://localhost:3000/update (PUT)

    fields for this route: 
    {
        token: "required"
        id : "Id of the user to be updated"
        updateList : {
            object containing fields needs to be updated
        }
    }

    response: 
        if successfully updated then success message 
        else error message with relevent error code

    constraint:
        An admin can update itself and any user
        A user can update only himself