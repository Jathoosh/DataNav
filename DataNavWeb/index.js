const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize, QueryTypes} = require('sequelize');
const app = express();
const host = "http://localhost";
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}

// We'll use the public directory to serve the Vue App
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/api/codeGenerator', (req, res) => {
    const random = require('random-string-generator');
    const token = random(6, 'numeric');

    const numServer = req.body.numServer;
    const serverRoad = req.body.serverRoad;
    //TODO: Save token to database with numServer and serverRoad
    console.table(req);
    //After 5 minutes, delete token from database
    setTimeout(() => {
        //TODO: Delete token from database
        console.log("Token deleted: " + token);
    }, 3000); //TODO: Change to 300000
    res.status(200).send({token:token});
});

app.listen(port, () => {
 console.log(`App listening on ${host}:${port}`);
});