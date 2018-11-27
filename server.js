// CONFIG //
// Environment variables
require('dotenv').config();
// Express
const express = require('express');

const app = express();
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');
// Body Parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// Database
const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.TABLE_NAME,
  user: process.env.TABLE_USERNAME,
  password: process.env.TABLE_PASSWORD,
});
// Password hashing
const bcrypt = require('bcrypt');

const saltRounds = 10;
// Chatkit
const Chatkit = require('@pusher/chatkit-server');
// Fetch
const fetch = require('node-fetch');

// NEW CHATKIT INSTANCE //
const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY,
});

// GET CHATKIT TOKEN //
let token;
const instanceId = process.env.CHATKIT_INSTANCE_ID;
fetch(process.env.CHATKIT_TOKEN_PROVIDER_URL, {
  method: 'POST',
  body: JSON.stringify({
    grant_type: 'client_credentials',
    user_id: 'jane',
  }),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((authResponse) => {
    token = authResponse.access_token;
  });

// ROUTES //

// Root
app.get('/', (req, res) => {
  res.render('index');
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.one('SELECT * FROM users WHERE username = $1', [username])
    .then((user) => {
      if (!user) {
        console.log('User does not exist!');
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            res.json({ status: 'OK', id: user.id, username: user.username });
          } else {
            res.send('Incorrect Password');
            console.log('Incorrect Password');
          }
        });
      }
    })
    .catch((error) => console.log(error));
});

// Create new user
app.post('/api/create-user', (req, res) => {
  const { username, password, avatar } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.one(
      `
      INSERT INTO users (username, password, avatar_url)
      VALUES ($1, $2, $3)
      RETURNING id, username, avatar_url
      `,
      [username, hash, avatar],
    )
      .then((response) => {
        const userId = response.id.toString();
        chatkit
          .createUser({
            id: userId,
            name: response.username,
            avatarURL: response.avatar_url,
          })
          .then((data) => {
            res.json({ status: 'OK', id: data.id, name: data.name });
          });
      })
      .catch((error) => console.log(error));
  });
});

// Create new room
app.post('/api/new-room', (req, res) => {
  const { creatorId, name } = req.body;
  chatkit
    .createRoom({
      creatorId,
      name,
    })
    .then(() => {
      res.json('Room created successfully');
      console.log('Room created successfully');
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get user's rooms by user id
app.get('/users/:userId/rooms', (req, res) => {
  const { userId } = req.params;
  fetch(`https://us1.pusherplatform.io/services/chatkit/v1/${instanceId}/users/${userId}/rooms`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.log(error));
});

// Get user by ID
app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  db.one('SELECT * FROM users WHERE id = $1', [userId])
    .then((response) =>
      res.json({
        id: response.id.toString(),
        name: response.username,
        avatarURL: response.avatar_url,
      }),
    )
    .catch((error) => console.log(error));
});

// Start listening
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port number ${port}`);
});
