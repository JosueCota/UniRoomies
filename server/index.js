const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

//Create .env file
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST || "localhost";
const port = process.env.PORT || "8081"

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: dbHost,
    user:"root",
    password: dbPassword,
    database: dbName,
});

app.listen(port , ()=> {
    console.log("Listening...")
});