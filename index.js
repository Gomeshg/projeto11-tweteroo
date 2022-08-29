import express, { json } from 'express';
import cors from 'cors';
const server = express();
const PORT = 5000;
server.use(cors());
server.use(json());

let users = [];
let tweets = [];

server.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;
    
    if(!username || !avatar){
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
    }
    
    if(userAlredyKnown(username)){
        res.status(409).send('Este usuário já existe!');
        return;
    }

    const user = {
        username: username,
        avatar: avatar
    }
    
    users.push(user);
    res.send(users)
    // res.status(201).send('Ok');
});


server.post('/tweets', (req, res) => {

    const {username, tweet} = req.body;
    const user = users.filter(user => user.username === username);
    const __tweet = {
        username: username,
        avatar: user[0].avatar,
        tweet: tweet
    }

    if(!username || !tweet){
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
    }

    console.log(__tweet);
    tweets.push(__tweet);
    res.send(tweets);
    // res.status(201).send('OK');
});


server.get('/tweets', (req, res) => {
    let sliceTweets = tweets.slice(tweets.length-10, tweets.length);
    res.send(sliceTweets.reverse());
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
});



function userAlredyKnown(username){
    for (let i = 0; i < users.length; i++) {
        if(users[i].username === username){
            return true;
        }
    }
    return false;
}