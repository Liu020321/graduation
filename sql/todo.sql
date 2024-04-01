create table todo
(
    id          int auto_increment
        primary key,
    description varchar(500) not null,
    completed   tinyint(1)   null,
    timeStamp   datetime     null,
    constraint description
        unique (description)
);

