const express = require('express');
const bodyParser = require('body-parser');
const Chatkit = require('@pusher/chatkit-server');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/rooms', (req,res) => { //Get rooms by user id

  const rooms = {
    "rooms": [
      {
        "id": 1,
        "created_by_id": 1,
        "name": "januaryroom",
        "private": false,
        "created_at": "2017-03-23T11:36:42Z",
        "updated_at": "2017-03-23T11:36:42Z",
        "member_user_ids": ["luke", "ham"]
      },
      {
        "id": 2,
        "created_by_id": 2,
        "name": "februaryroom",
        "private": false,
        "created_at": "2017-03-23T11:40:42Z",
        "updated_at": "2017-03-23T11:40:42Z",
        "member_user_ids": ["luke", "paul"]
      },
      {
        "id": 3,
        "created_by_id": 1,
        "name": "marchroom",
        "private": false,
        "created_at": "2017-03-23T11:45:42Z",
        "updated_at": "2017-03-23T11:45:42Z",
        "member_user_ids": ["ham", "paul"]
      },
      {
        "id": 4,
        "created_by_id": 2,
        "name": "aprilroom",
        "private": false,
        "created_at": "2017-03-23T11:45:42Z",
        "updated_at": "2017-03-23T11:45:42Z",
        "member_user_ids": ["luke", "ham"]
      },
      {
        "id": 5,
        "created_by_id": 1,
        "name": "mayroom",
        "private": false,
        "created_at": "2017-03-23T11:50:42Z",
        "updated_at": "2017-03-23T11:50:42Z",
        "member_user_ids": ["paul", "luke"]
      }
    ]
  };

  res.json(rooms);
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

app.listen(8080, function(){
  console.log('Listening on port 8080');
});