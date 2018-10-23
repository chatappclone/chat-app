const express = require('express');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
require('dotenv').config();
const app = express();
const fetch = require('node-fetch');

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY
});

let token;
const instanceId = process.env.CHATKIT_INSTANCE_ID;
fetch(`https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${instanceId}/token`, {
  method: 'POST',
  body: JSON.stringify({ grant_type: 'client_credentials',
                         user_id: 'yetkin' }),
  headers: {
      'Content-Type': 'application/json'
  }})
  .then(response => {
    console.log(response.json());
    token = response['access_token'];
  });

app.get('/', function(req, res){
  res.render('index');
});

app.get('/users/2/rooms', (req,res) => {
  fetch(`https://us1.pusherplatform.io/services/chatkit/v1/${instanceId}/rooms`)
  .then(response => res.json(response))
  .catch(error => console.log(error));
});

app.get('/rooms/19295262/messages', (req,res) => { //Get rooms by user id
  fetch(`https://us1.pusherplatform.io/services/chatkit/v1/${instanceId}/rooms/19295262/messages`)
  .then(response => res.json(response))
  .catch(error => console.log(error));
});

app.get('/api/messages', (req,res) => { //Get messages by user id

  const messages = [
    {
      "id": 1,
      "user_id": 1,
      "room_id": 1,
      "text": "Hola!",
      "created_at": "2017-03-23T11:36:42Z",
      "updated_at": "2017-03-23T11:36:42Z"
    },
    {
      "id": 2,
      "user_id": 2,
      "room_id": 1,
      "text": "How is it going!",
      "created_at":"2017-03-23T11:36:56Z",
      "updated_at":"2017-03-23T11:36:56Z"
    },{
      "id": 3,
      "user_id": 2,
      "room_id": 1,
      "text": "Haven't talked in ages.",
      "created_at": "2017-03-23T11:37:23Z",
      "updated_at": "2017-03-23T11:37:23Z"
    },{
      "id": 4,
      "user_id": 1,
      "room_id": 1,
      "text": "Great thanks, I'm on a course at the moment and don't have too much free time.",
      "created_at": "2017-03-23T11:37:29Z",
      "updated_at": "2017-03-23T11:37:29Z"
    },{
      "id": 5,
      "user_id": 1,
      "room_id": 1,
      "text": "How about you? Loved you Italy pics.",
      "created_at": "2017-03-23T11:37:50Z",
      "updated_at": "2017-03-23T11:37:50Z"
    }
  ];

  res.json(messages);
});

app.post('/api/new-user', (req,res) => {
  const { id, name } = req.body;
  chatkit.createUser({
    id,
    name
  })
    .then(() => {
      res.json('User created successfully')
      console.log('User created successfully');
    }).catch((err) => {
      console.log(err);
    });
})

app.post('/api/new-room', (req, res) => {
  const { creatorId, name } = req.body;
  chatkit.createRoom({
    creatorId,
    name,
  })
    .then(() => {
      res.json('Room created successfully');
      console.log('Room created successfully');
    }).catch((err) => {
      console.log(err);
    });
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});