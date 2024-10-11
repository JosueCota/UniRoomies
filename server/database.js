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
]

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

const addAssociations = () => {
    const [user, user_detail, room] = sequelize.models;

    user.hasOne(user_detail, {onDelete: "CASCADE"});
    user.hasMany(room, {onDelete: "CASCADE"});
    
    room.belongsTo(user,);
    user_detail.belongsTo(user);

}

dbSetup();

module.exports = sequelize
