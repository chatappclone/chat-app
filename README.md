# **WhatsApp Clone**

WhatsApp Clone is our attempt to replicate the basic functionality of WhatsApp.

<p float="left">
  <img src="./static/assets/readme-login.png?raw=true" alt="Login" width=200px>
  <img src="./static/assets/readme-chats.png?raw=true" alt="Chats" width=200px>
  <img src="./static/assets/readme-newChat.png?raw=true" alt="New Chat" width=200px>
  <img src="./static/assets/readme-chatroom.png?raw=true" alt="Chatroom" width=200px>
</p>

## Summary

WhatsApp Clone lets you communicate with others on the platform in the same format and design as the original WhatsApp. Based on Pusher's ChatKit API, users can start one-to-one or group chats and receive messages in realtime.

## The Team

- Yetkin Ergun
- Matt Collier
- David Gridley

## Technologies used

**Front End**

- React
- SCSS
- Handlebars

**Back End**

- Node.js
- Express
- ChatKit
- Postgres
- bcrypt

**Unit Testing**

- Jest

**Build**

- webpack

## Installation

- Fork and clone this repo.
- Run `npm install` to install dependencies.
- Create a `.env` file to store your database and ChatKit credentials.
- Create a local database using the supplied queries in [database.sql](database.sql).
- Run `npm start` to start the Node server with Nodemon.
- Run `npm run dev` to create a development build with webpack.

- This app was built with mobile-use in mind, it is advised that browser dev tools are used to replicate a mobile browser window.

**Tests**

- Run `npm test` to execute the test suite.

## Features

- Users can log into existing accounts or create new accounts
- Once logged in, the user automatically joins an existing chatroom with the developers
- All clients will receive new messages automatically in realtime
- Chatrooms with recent activity will be moved to the top of the list

## Questions / Comments?

- Let us know by opening an issue on GitHub!
