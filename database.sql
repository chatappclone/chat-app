CREATE DATABASE chat_app;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(100) NOT NULL,
phone_number char(11) NOT NULL UNIQUE
);

INSERT INTO users (username, phone_number) VALUES ('john', '07788999111');
INSERT INTO users (username, phone_number) VALUES ('jane', '07766555444');