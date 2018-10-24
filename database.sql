CREATE DATABASE chat_app;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(100) NOT NULL UNIQUE,
password text NOT NULL UNIQUE
);

INSERT INTO users (username, password) VALUES ('john', 'johnpassword');
INSERT INTO users (username, password) VALUES ('jane', 'janepassword');