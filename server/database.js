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
    require("./models/room_image.model")
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
        throw new Error(error)
    }
}

// Relations between Tables 
const addAssociations = () => {
    const {User, User_Detail, Room, Room_Image } = sequelize.models;
    
    User.hasOne(User_Detail, {onDelete: "CASCADE"});
    User.hasOne(Room, {onDelete: "CASCADE", foreignKey: {name:"UserId"}});
    Room.hasOne(Room_Image, 
        {
            onDelete:"CASCADE", 
            foreignKey: {
                name: 'RoomId'}
            }
        );
        
    Room.belongsTo(User, {foreignKey: "UserId" });
    User_Detail.belongsTo(User);
    Room_Image.belongsTo(Room, { foreignKey: 'RoomId' });
}

dbSetup();

module.exports = sequelize
