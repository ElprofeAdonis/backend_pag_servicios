CREATE DATABASE apiback_clonn;
CREATE TABLE superusuario(
   id_s SERIAL PRIMARY KEY,
    s_name TEXT NOT NULL,
    s_email TEXT NOT NULL UNIQUE,
    s_password TEXT NOT NULL 
);

CREATE TABLE usuario(
    id_u SERIAL PRIMARY KEY,
    u_name TEXT NOT NULL,
    u_email TEXT NOT NULL UNIQUE,
    u_password TEXT NOT NULL 
);

CREATE TABLE tweets(
    id_t SERIAL PRIMARY KEY,
    t_id INTEGER REFERENCES superusuario(id_s),
    t_comentario TEXT NOT NULL,
    t_foto TEXT NOT NULL
);

CREATE TABLE uservstweets(
    s_id INTEGER REFERENCES usuario(id_u),
    t_id INTEGER REFERENCES tweets(id_t)
);

CREATE VIEW superusuariovstweets
AS
    SELECT * 
    FROM tweets JOIN (SELECT s_name, s_email, id_s 
    FROM superusuario) AS s ON t_id=id_s

CREATE TABLE comentario(
    id_c SERIAL PRIMARY KEY,
    t_id INTEGER NOT NULL REFERENCES tweets(id_t),
    c_comentario TEXT NOT NULL,
    c_foto TEXT
);

CREATE TABLE likee(
    id_l SERIAL PRIMARY KEY,
    t_id INTEGER NOT NULL REFERENCES tweets(id_t)
);

CREATE TABLE follow(
    id_l SERIAL PRIMARY KEY,
    u_id INTEGER NOT NULL REFERENCES usuario(id_u)
);