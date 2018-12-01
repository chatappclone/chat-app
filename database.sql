CREATE DATABASE chat_app;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(100) NOT NULL UNIQUE,
password text NOT NULL,
avatar_url text NOT NULL 
); 

INSERT INTO users (id, username, password, avatar_url) VALUES (1, 'yetkin', '$2b$10$qLJdrgSB8eU1JiEsKy3ULuOw7qX07Qmi3KfyfjDUxoSIs12eFuUue', 'https://avatars0.githubusercontent.com/u/42815334?s=400&u=41ea37716440b0e21c69285fdb88ebd4b7995b9a&v=4');
INSERT INTO users (id, username, password, avatar_url) VALUES (2, 'matt', '$2b$10$At6uzvVwiXe9Y1WkdQrxweHBxcCfuOn.ZYQHUIb4FotTh4y9Cwzz.', 'https://avatars3.githubusercontent.com/u/2234289?s=400&u=766b5552d501436b2931466a84047de5892fdcd2&v=4');
INSERT INTO users (id, username, password, avatar_url) VALUES (3, 'david', '$2b$10$uNookqvw5XIu6erkcxWVgumN1T2Trow6thsYirnTNODuXAgZOpF8K', 'https://avatars1.githubusercontent.com/u/42816100?s=400&u=93499283d3281eeaecd9a5fe12a86a0c99a30d37&v=4');

