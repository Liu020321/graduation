create table user
(
    id       int auto_increment
        primary key,
    username varchar(20)  not null,
    userHead varchar(255) not null,
    email    varchar(120) not null,
    password varchar(600) not null,
    name     varchar(20)  not null,
    age      int          not null,
    idCard   bigint       null,
    isAdmin  tinyint(1)   null,
    constraint email
        unique (email),
    constraint idCard
        unique (idCard),
    constraint username
        unique (username)
);

create index ix_user_age
    on user (age);

create index ix_user_name
    on user (name);

INSERT INTO graduation.user (id, username, userHead, email, password, name, age, idCard, isAdmin) VALUES (1, 'Lht2002321', 'assets/images/user/user_lht.png', '164755927@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', '刘海涛', 21, 150403200203215133, 1);
INSERT INTO graduation.user (id, username, userHead, email, password, name, age, idCard, isAdmin) VALUES (2, 'Zcg13', 'assets/images/user/use1.png', '1@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', '张长弓', 25, 78, 0);
INSERT INTO graduation.user (id, username, userHead, email, password, name, age, idCard, isAdmin) VALUES (3, 'Lvb', 'assets/images/user/user.png', '2@qq.com', 'sha256$ibaSKLSEJW9jaBNS$5b0be8009bc9ba62f9a983a2b54cd32e43a2a63e24e0e2eaf052d1fedbcdc90e', '王子李', 32, 15, 0);
