const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize, QueryTypes} = require('sequelize');
const bcrypt=require('bcrypt');
const app = express();

const tokens = [];

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();

const host = process.env.WEB_HOST;
const port = process.env.WEB_PORT;

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

// Login Process
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    sequelize
    .query('SELECT * FROM Utilisateur WHERE email = :username', {
        replacements: { username: username },
        type: QueryTypes.SELECT,
    })
    .then((results) => {
        if (results.length === 0) {
            res.status(422).send('Nom d\'utilisateur incorrect');
        } else {
            const user = results[0];
            const hashedPassword = user.mot_de_passe;

            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    console.error('Erreur lors de la comparaison des mots de passe', err);
                    res.status(500).send('Erreur de serveur');
                } else if (result) {
                    res.status(200).send({ message: 'Authentification réussie', company: user.entreprise, username: user.nom });
                } else {
                    res.status(422).send('Mot de passe incorrect');
                }
            });
        }
    })
    .catch((err) => {
        console.error('Erreur lors de la recherche de l\'utilisateur', err);
        res.status(500).send('Erreur de serveur');
    });
});

// Code generation
app.post('/api/codeGenerator', (req, res) => {
    const random = require('random-string-generator');
    const numServer = req.body.numServer;
    const serverRoad = req.body.serverRoad;

    do {
        var token = random(6, 'numeric');
    }while(tokens.includes(token) || token[0] === 0);

    sequelize.query("INSERT INTO Token (code, numServeur, serverRoute) VALUES (:code, :numServeur, :serverRoute)", {
        replacements: {code: token, numServeur: numServer, serverRoute: serverRoad},
        type: QueryTypes.INSERT
    }).then(() => {
        tokens.push(token);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error: err});
    });

    setTimeout(() => {
        sequelize.query("DELETE FROM Token WHERE code = :code", {
            replacements: {code: token},
            type: QueryTypes.DELETE
        }).then(() => {
            tokens.splice(tokens.indexOf(token), 1);
        }).catch((err) => {
            console.log(err);
        });
    }, 300000);

    res.status(200).send({token:token});
});

// Token verification
app.get('/api/tokenvalidation/:token', (req, res) => {
    const token = req.params.token;

    sequelize.query("SELECT * FROM Token WHERE code = :code", {
        replacements: {code: token},
        type: QueryTypes.SELECT
    }).then((results) => {
        if(results.length === 0) {
            res.status(422).send({message: 'Code invalide'});
        } else {
            sequelize.query("DELETE FROM Token WHERE code = :code", {
                replacements: {code: token},
                type: QueryTypes.DELETE
            }).then(() => {
                tokens.splice(tokens.indexOf(token), 1);
            }).catch((err) => {
                console.log(err);
            });
            res.status(200).send({message: 'Code valide', numServer: results[0].numServeur, serverRoute: results[0].serverRoute});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({error: err});
    });
});

app.listen(port, () => {
 console.log(`App listening on ${host}:${port}`);
});