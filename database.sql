CREATE DATABASE chat_app;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(100) NOT NULL UNIQUE,
password text NOT NULL
);

INSERT INTO users (username, password) VALUES ('john', 'johnpassword');
INSERT INTO users (username, password) VALUES ('jane', 'janepassword');
INSERT INTO users (username, password) VALUES ('testuser', '$2b$10$K9wczwMIX5eYG0vi5kFt..44TYdZBSbFzecAvXbmg1BiHGC9Lccfy');
INSERT INTO users (username, password) VALUES ('testuser2', '$2b$10$uRMdWmjAzvsqOZoMiddxse8zsu1.M426lFLuEEvRDENeVNgnlStsi');
