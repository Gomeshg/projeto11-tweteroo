const express = require('express');
const cors = require('cors');
const server = express();
const PORT = 5000;
server.use(cors());
server.use(express.json());

let users = [];

server.post('/sign-up' , (req, res) => {

    const {username, avatar} = req.body;
    const user = {
        username: username,
        avatar: avatar
    }

    if(!username && !avatar){
        res.sendStatus(400);
        return;
    }


    users.push(user);
    res.status(201).send('Ok');
})

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});