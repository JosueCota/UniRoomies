const Sequelize = require("sequelize");

//Create .env file with MySQL db info
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(
    dbName, 
    "root", 
    dbPassword, 
    {
        host: dbHost,
        dialect: "mysql"
    }
);

const modelDefs = [
    require('./models/user.model'),
    require('./models/room.model'),
    require('./models/user_detail.model'),
    require('./models/account'),
]

//Sends sequelize object to model function
for (const modelDef of modelDefs) {
    modelDef(sequelize);
}

const dbSetup = async () => {
    try {
        addAssociations()

    } catch (error) {
        console.log(error)
    }
}

// Relations between Tables 
const addAssociations = () => {
    const {user, user_detail, room, account} = sequelize.models;

    user.hasOne(user_detail, {onDelete: "CASCADE"});
    user.hasMany(room, {onDelete: "CASCADE"});
    user.hasOne(account, {onDelete: "CASCADE"});

    room.belongsTo(user,);
    user_detail.belongsTo(user);
    account.belongsTo(user);
}

dbSetup();

module.exports = sequelize
