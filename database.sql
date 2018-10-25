CREATE DATABASE chat_app;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username varchar(100) NOT NULL UNIQUE,
password text NOT NULL,
avatar_url text NOT NULL 
); 

INSERT INTO users (id, username, password, avatar_url) VALUES (5, 'yetkin', '$2b$10$AP/ln6pV5ghRtk13IM5XQ.Fm5Ux.sLSI2a9GYjEaim7EfQcUueW9q', 'https://avatars0.githubusercontent.com/u/42815334?s=400&u=41ea37716440b0e21c69285fdb88ebd4b7995b9a&v=4');
INSERT INTO users (id, username, password, avatar_url) VALUES (6, 'matt', '$2b$10$kegqhomfZcJerBHJPEv1J.pA90QeRom/4nvHd9rdhRGwwooE1.ddS', 'https://avatars3.githubusercontent.com/u/2234289?s=400&u=766b5552d501436b2931466a84047de5892fdcd2&v=4');
INSERT INTO users (id, username, password, avatar_url) VALUES (7, 'david', '$2b$10$M3kk8Qn9KpaiGDmf6B6W2ebrocGACx.KBDUxRIl7gunXYtQK88etK', 'https://avatars1.githubusercontent.com/u/42816100?s=400&u=93499283d3281eeaecd9a5fe12a86a0c99a30d37&v=4');
INSERT INTO users (id, username, password, avatar_url) VALUES (8, 'tony', '$2b$10$raZDqonYiTjcyy3Q2DGLzOZaRmIqyO3myK2qE51yFil3INsSwgNAG', 'https://secure.gravatar.com/avatar/0ba92bd0375beca9c95f958e7a331219');
ALTER SEQUENCE users_id_seq RESTART WITH 9 INCREMENT BY 1;
