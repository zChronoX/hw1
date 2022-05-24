CREATE DATABASE gtechdb;

USE gtechdb;

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    nome varchar(15),
    cognome varchar(15),
    username varchar(21),
    password varchar(255),
    email varchar(51),
    gender varchar(10),
    data_registrazione varchar(10)
);

CREATE TABLE posts (
    id integer primary key auto_increment,
    titolo varchar(255),
    testo varchar(255),
    userid integer not null,
    time timestamp not null default CURRENT_TIMESTAMP,
    foreign key(userid) references users(id) on delete cascade on update cascade
) Engine = InnoDB;