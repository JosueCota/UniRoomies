const sequelize  = require("../database.js");
const bcrypt = require("bcryptjs")
const User = sequelize.models.User

//Update User Password with the req.body.id sent and new password (could use email too instead of param)
const updateUserPassword = async (req, res) => {

    try {
        const { oldPassword, newPassword } = req.body;
        const id = req.params.id;
        
        //Check User if Exists
        const user = await User.findByPk(id);
        if (!user){
            throw "User doesn't exist";
        }

        //Verify User Sent old Password
        const verify = await bcrypt.compare(oldPassword, user.password )
        if (!verify) {
            throw "User provided incorrect password";
        }

        //Salt and Hash New Password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        const body = await User.update(
            {password: hashedPassword },
            {
                where: {
                    id: id
                }
        });

        res.status(200).send(body)

    } catch (error) {
        res.status(403).send(error)
    }
}

const updateUser = async(req, res) => {
    try {
        //Expecting Cleaned/Valid Data
        const {firstName, lastName, email} = req.body;
        const id = req.params.id;
        
        const user = await User.findByPk(id);
        
        if (!user) {
            throw "User doesn't exist"
        }

        const body = await User.update(
            {
                firstName: firstName, 
                lastName: lastName,
                email: email
            },
            {
                where: {
                    id: id
            }
        });
        
        res.status(200).send(body)
    } catch (error) {
        res.status(400).send(error)
    }

}

const getUsers = async (req, res) => {
    try{
        const users = await User.findAll({where: {isActive : true}})
        
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send(error)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        //User doesn't exist
        if (!user) throw ("User with id doesn't exist")
        //User is unavailable
        if (!user.isRegister || !user.isActive) throw ("User is either unregistered or inactive!")
        
        res.status(200).send(user)

    } catch(error) {
        res.status(404).send(error)
    }
}

//Delete user based on id sent
const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;
        
        if (! await User.findByPk(id)){
            throw "Not Found"
        }

        const delUser = await User.destroy({
            where: {
                id: id
            }
        })

        res.sendStatus(200);

    } catch(error) {
        res.sendStatus(404);
    }


}

module.exports = {
    deleteUser,
    getUser,
    updateUser,
    getUsers,
    updateUserPassword
}