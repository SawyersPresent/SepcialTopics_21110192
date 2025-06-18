# TLDR;

33rd party API works, change the cotnent of the fucking shitty events pls thanks me

also connect the database and make sure backend is working

also also so i dont forget

the password for postgresql is pass

virus total branch successfully merged fully


```
-- Connect to your database
psql -U postgres -d SpecialTopics

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```