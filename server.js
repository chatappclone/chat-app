const express = require("express");
const bodyParser = require("body-parser");
const Chatkit = require("@pusher/chatkit-server");
require("dotenv").config();
const app = express();
const fetch = require("node-fetch");
const pgp = require("pg-promise")();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.TABLE_NAME,
  user: process.env.TABLE_USERNAME,
  password: process.env.TABLE_PASSWORD
});
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
  key: process.env.CHATKIT_SECRET_KEY
});

let token;
const instanceId = process.env.CHATKIT_INSTANCE_ID;
fetch(process.env.CHATKIT_TOKEN_PROVIDER_URL, {
  method: "POST",
  body: JSON.stringify({
    grant_type: "client_credentials",
    user_id: "jane"
  }),
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(authResponse => {
    token = authResponse["access_token"];
  });

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/users/:userId/rooms", (req, res) => {
  const userId = req.params.userId;
  fetch(
    `https://us1.pusherplatform.io/services/chatkit/v1/${instanceId}/users/${userId}/rooms`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(error => console.log(error));
});

app.post("/api/create-user", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.one(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hash]
    )
      .then(response => {
        const userId = response.id.toString();
        chatkit
          .createUser({
            id: userId,
            name: response.username
          })
          .then(data => {
            res.json({id: data.id, name: data.name});
          });
      })
      .catch(error => console.log(error));
  });
});

app.post("/api/new-room", (req, res) => {
  const { creatorId, name } = req.body;
  chatkit
    .createRoom({
      creatorId,
      name
    })
    .then(() => {
      res.json("Room created successfully");
      console.log("Room created successfully");
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
