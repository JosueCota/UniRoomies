const db  = require("../database.js");
const bcrypt = require("bcryptjs");

const User = db.models.User;

const createUser = async (req, res) => {
    
    try {

        //Check if user with email already exists
        
        
        //Salt and Hash Password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        
        //Generate regEmailCode
        //Send link to email, link should include regCode in param
        
        //Store User
        User.sync({alter:true}).then(()=> {
            User.build({
                firstName: req.body.FirstName,
                lastName: req.body.lastName,
                password: hashedPassword,
                email: req.body.email
            });
        }).catch(error => {
            console.log(error)
        })
    } catch (error) {
        
    }
    }

    const login = async (req, res) => {
        try {
            if (req.body.password && req.body.email) {
                res.send("Successful Login")
            }

        } catch (error) {

        }
    }


module.exports = {
    createUser,
    login
}