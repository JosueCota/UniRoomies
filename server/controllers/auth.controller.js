const db  = require("../database.js");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
    const q = "SELECT FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).send(err);
        if (data.length > 0) return res.status(409).send("User already exists with that email!");
        
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`firstName`, `lastName`, `email`, `password`) VALUE (?)";
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hashedPassword,
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send("User has been created: ", data)
        })
    })
}

