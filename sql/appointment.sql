create table appointment
(
    id          int auto_increment
        primary key,
    doctor_id   int          not null,
    time        date         not null,
    user_id     int          not null,
    description varchar(255) not null,
    isRepeat    int          not null,
    status      int          not null,
    constraint appointment_ibfk_1
        foreign key (doctor_id) references doctor (id),
    constraint appointment_ibfk_2
        foreign key (user_id) references user (id)
);

create index doctor_id
    on appointment (doctor_id);

create index user_id
    on appointment (user_id);

INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (1, 1, '2024-04-05', 2, 'test', 0, 0);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (2, 1, '2024-04-05', 3, 'test', 0, 0);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (3, 2, '2024-04-06', 2, 'test', 0, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (4, 2, '2024-04-07', 3, 'test', 0, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (5, 3, '2024-04-08', 2, 'test', 0, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (6, 3, '2024-04-05', 2, '123', 1, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (8, 1, '2024-04-05', 2, '京味儿环境宽松自动好几棵', 0, 0);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (9, 1, '2024-04-05', 2, '就是', 1, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (10, 1, '2024-04-05', 2, '就是', 1, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (11, 2, '2024-04-05', 2, 'qwuioequ', 0, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (12, 2, '2024-04-05', 2, 'qwe', 0, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (13, 2, '2024-04-05', 2, 'wqeq', 0, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (14, 3, '2024-04-05', 2, 'QWEQ', 1, 1);
INSERT INTO graduation.appointment (id, doctor_id, time, user_id, description, isRepeat, status) VALUES (15, 2, '2024-04-05', 2, 'dasadas', 1, 1);
