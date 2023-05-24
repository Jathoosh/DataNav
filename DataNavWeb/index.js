const express = require('express');
const app = express();
const host = "http://localhost";
const port = 3000;

// We'll use the public directory to serve the Vue App
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/api/codeGenerator', (req, res) => {
    const random = require('random-string-generator');
    const token = random(6, 'numeric');

    const numServer = req.params.numServer;
    const serverRoad = req.params.serverRoad;
    //TODO: Save token to database with numServer and serverRoad
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