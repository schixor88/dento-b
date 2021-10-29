CREATE DATABASE dento;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL DEFAULT 'user',
    user_password VARCHAR(255) NOT NULL
);

DROP TABLE users;

INSERT INTO USERS(user_name, user_email, user_password) VALUES ('henry', 'henry@gmail.com', 'password');

INSERT INTO USERS(user_name, user_email, user_passwor, user_role) VALUES ('admin', 'henry@gmail.com', 'password', 'admin');
