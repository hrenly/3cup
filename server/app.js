"use strict";

const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const db = new DB("sqlitedb")
const app = express();

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// CORS middleware
const enableCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');

    next();
}

app.use(enableCrossDomain)


router.post('/register', function (req, res) {
    const surname = req.body.surname || '';
    const patronymic = req.body.patronymic || '';
    const birthyear = req.body.birthyear || '';
    db.insert([
        req.body.name,
        req.body.email,
        bcrypt.hashSync(req.body.password, 8),
        surname,
        patronymic,
        birthyear,
    ],
        function (err) {
            console.log(err);
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err, user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});

router.post('/login', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
    });
});

router.post('/user', (req, res) => {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        res.status(200).send({ user });
    });
});

router.post('/updatepass', (req, res) => {
    db.updatePass({
        '$id': req.body.id,
        '$password': bcrypt.hashSync(req.body.password, 8),
    }, (err) => {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).send();
    });
});

router.post('/updatedata', (req, res) => {
    db.updateData({
        '$id': req.body.id,
        '$name': req.body.name,
        '$email': req.body.email,
    }, (err) => {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).send();
    });
});

router.post('/users', (req, res) => {
    db.selectAllUsers((err, users) => {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).send({ users });
    });
});

router.post('/userid/:id', (req, res) => {
    db.selectById(req.params.id, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).send({ user });
    });
})

router.post('/removeuser', (req, res) => {
    db.removeUser(req.body.id, (err, id) => {
        if (err) return res.status(500).send('Error on the server.');
        res.status(200).send();
    });
})


app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function () {
    console.log('Server listening on port ' + port)
});
