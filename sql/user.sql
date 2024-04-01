create table user
(
    id       int auto_increment
        primary key,
    username varchar(20)  not null,
    email    varchar(120) not null,
    password varchar(600) not null,
    isAdmin  tinyint(1)   null,
    constraint email
        unique (email),
    constraint username
        unique (username)
);

INSERT INTO graduation.user (id, username, email, password, isAdmin) VALUES (1, 'Lht2002321', '164755927@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', 1);
INSERT INTO graduation.user (id, username, email, password, isAdmin) VALUES (2, 'Zcg13', '1@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', 0);
INSERT INTO graduation.user (id, username, email, password, isAdmin) VALUES (3, 'Lvb', '2@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', 0);
