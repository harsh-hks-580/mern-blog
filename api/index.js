const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'co3y54b3y49w3yto7c3yb47f'

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.12');

app.post('/register', async (req, res)=>{
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(e){
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res)=>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk) {
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token)=>{
            if(err) throw err;
            res.cookie('token', token).json('ok');
        })
    } else {
        res.status(400).json('wrong credentials');
    }
})

app.get('/profile', (req, res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        res.json(info);
    });
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.listen(4000);