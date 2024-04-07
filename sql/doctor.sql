create table doctor
(
    id            int auto_increment
        primary key,
    user_id       int          not null,
    department_id int          not null,
    schedule      varchar(100) not null,
    constraint doctor_ibfk_1
        foreign key (department_id) references department (id),
    constraint doctor_ibfk_2
        foreign key (user_id) references user (id)
);

create index department_id
    on doctor (department_id);

create index user_id
    on doctor (user_id);

INSERT INTO graduation.doctor (id, user_id, department_id, schedule) VALUES (1, 1, 1, '周一至周五上午');
INSERT INTO graduation.doctor (id, user_id, department_id, schedule) VALUES (2, 4, 2, '周一至周五下午');
INSERT INTO graduation.doctor (id, user_id, department_id, schedule) VALUES (3, 5, 3, '周三至周五上午');
INSERT INTO graduation.doctor (id, user_id, department_id, schedule) VALUES (4, 6, 1, '周一至周五下午');
INSERT INTO graduation.doctor (id, user_id, department_id, schedule) VALUES (5, 7, 2, '周一至周五上午');
