CREATE DATABASE docs;

CREATE TABLE doc(
    doc_id SERIAL PRIMARY KEY,
    docName VARCHAR(255),
    projectName VARCHAR(255),
    discipline VARCHAR(255),
    author VARCHAR(255),
    status VARCHAR(255),
    description TEXT,
    uuid TEXT, 
    addedOn timestamp NOT NULL DEFAULT NOW()
);


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(28) NOT NULL UNIQUE,
    password VARCHAR NOT NULL

);

CREATE TABLE tests(
    user_id SERIAL PRIMARY KEY,
    file_name VARCHAR,
    file bytea NOT NULL

);