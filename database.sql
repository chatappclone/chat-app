CREATE DATABASE chat_app;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(100) NOT NULL UNIQUE,
password text NOT NULL,
avatar_url text NOT NULL 
);

INSERT INTO users (username, password, avatar_url) VALUES ('john', 'johnpassword', 'https://secure.gravatar.com/avatar/0ba92bd0375beca9c95f958e7a331219');
INSERT INTO users (username, password, avatar_url) VALUES ('jane', 'janepassword', 'https://secure.gravatar.com/avatar/0ba92bd0375beca9c95f958e7a331219');
INSERT INTO users (username, password, avatar_url) VALUES ('testuser', '$2b$10$K9wczwMIX5eYG0vi5kFt..44TYdZBSbFzecAvXbmg1BiHGC9Lccfy', 'https://secure.gravatar.com/avatar/0ba92bd0375beca9c95f958e7a331219');
INSERT INTO users (username, password, avatar_url) VALUES ('testuser2', '$2b$10$uRMdWmjAzvsqOZoMiddxse8zsu1.M426lFLuEEvRDENeVNgnlStsi', 'https://secure.gravatar.com/avatar/0ba92bd0375beca9c95f958e7a331219');

