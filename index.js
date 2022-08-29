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
    
    if(username === undefined || avatar === undefined){
        res.status(422).send('A requisição não está no formato esperado!');
        return;
    }

    if(username === '' || avatar === ''){
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
    res.status(201).send('Ok');
});


server.post('/tweets', (req, res) => {

    const {username, tweet} = req.body;
    
    if(username === undefined || tweet === undefined){
        res.status(422).send('A requisição não está no formato esperado!');
        return;
    }

    if(username === '' || tweet === ''){
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
    }

    const user = users.filter(user => user.username === username);

    if(user.length === 0){
        res.status(404).send('Usuário inexistente!');
        return; 
    }

    const __tweet = {
        username: username,
        avatar: user[0].avatar,
        tweet: tweet
    }

    tweets.push(__tweet);
    res.status(201).send('OK');
});


server.get('/tweets', (req, res) => {
    if(tweets.length > 10){
        let sliceTweets = tweets.slice(tweets.length-10, tweets.length);
        res.send(sliceTweets.reverse());
    }
    else if(tweets.length <= 10){
        res.send(tweets.reverse());
    }
});


server.get('/tweets/:USERNAME', (req, res) => {

    const username = req.params.USERNAME;
    const __tweets = tweets.filter(tweet => tweet.username === username);

    if(__tweets.length === 0){
        res.status(404).send('Usuário inexistente!');
        return;
    }

    if(__tweets.length > 10){
        let sliceTweets = __tweets.slice(__tweets.length-10, __tweets.length);
        res.send(sliceTweets.reverse());
    }
    else if(__tweets.length <= 10){
        res.send(__tweets.reverse());
    }
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