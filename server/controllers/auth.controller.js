const { raw } = require("express");
const db  = require("../database.js");
const bcrypt = require("bcryptjs");

const User = db.models.User;

const createUser = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body
        
        
        //Check if user with email already exists
        const check = await User.findOne({where: {email: email}})
        if (check !== null) {
            throw ("User already exists with that email")
        }

        //Salt and Hash Password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        //Create User
        const user = await User.create({firstName: firstName, lastName:lastName, email:email, password:hashedPassword}) 
        
        res.status(200).send(user)

        //Generate regEmailCode
        //Send link to email, link should include regCode in param
        //Store User
        // User.sync({alter:true}).then(()=> {
        //     User.build({
        //         firstName: firstName, 
        //         lastName: lastName,
        //         password: hashedPassword,
        //         email: email
        //     }); 
        // }).catch(error => {
        //     console.log(error)
        // })
    
} catch (error) {
        res.status(401).send(error);
    }
}


    const login = async (req, res) => {
        try {
            const email = req.body.email
            const user = await User.findOne({where: { email } });

            //User doesn't exist with email
            if (!user) {
                throw ("Invalid Login")
            }
            
            //User hasn't been registered
            if (!user.isRegistered) {
                throw ("Please Confirm Your Email")
            }

            //User input incorrect password
            const valid = await bcrypt.compare(req.body.password, user.password);
            if(!valid) {
                throw ("Invalid Login Password")
            }

            res.status(200).send("Successful Login")

        } catch (error) {
            res.status(404).send(error)
        }
    }


module.exports = {
    createUser,
    login
}