create table UserMessage
(
    id       int auto_increment
        primary key,
    user_id  int          not null,
    userHead varchar(255) not null,
    name     varchar(20)  not null,
    age      int          not null,
    sex      int          not null,
    asset    varchar(255) not null,
    phone    varchar(11)  not null,
    idCard   bigint       null,
    constraint idCard
        unique (idCard),
    constraint UserMessage_ibfk_1
        foreign key (user_id) references user (id)
);

create index user_id
    on UserMessage (user_id);

INSERT INTO graduation.UserMessage (id, user_id, userHead, name, age, sex, asset, phone, idCard) VALUES (1, 1, 'assets/images/user/user_lht.png', '刘海涛', 22, 1, '长安区胜利北街17号石家庄铁道大学', '18731136590', 150403200203215133);
INSERT INTO graduation.UserMessage (id, user_id, userHead, name, age, sex, asset, phone, idCard) VALUES (2, 2, 'assets/images/dashboard/profile.png', '张长弓', 25, 1, '元宝山区平庄镇阳光花园', '19831130589', 150403199736892565);
INSERT INTO graduation.UserMessage (id, user_id, userHead, name, age, sex, asset, phone, idCard) VALUES (3, 3, 'assets/images/user/user.png', '王子李', 32, 0, '长安区胜利北街17号石家庄铁道大学', '13789592217', 14526199825783698);
INSERT INTO graduation.UserMessage (id, user_id, userHead, name, age, sex, asset, phone, idCard) VALUES (4, 4, 'assets/images/user/1.jpg', '赵体安明', 33, 1, '长安区胜利北街17号石家庄铁道大学', '12345678911', 789789123456123456);
INSERT INTO graduation.UserMessage (id, user_id, userHead, name, age, sex, asset, phone, idCard) VALUES (5, 5, 'assets/images/user/2.png', '花钱古', 26, 0, '长安区胜利北街17号石家庄铁道大学', '45678941324', 798789465412315746);
INSERT INTO graduation.UserMessage (id, user_id, userHead, name, age, sex, asset, phone, idCard) VALUES (6, 6, 'assets/images/user/2.jpg', '杀妻案魔', 30, 1, '长安区胜利北街17号石家庄铁道大学', '79845613245', 654987321456487874);
INSERT INTO graduation.UserMessage (id, user_id, userHead, name, age, sex, asset, phone, idCard) VALUES (7, 7, 'assets/images/user/4.jpg', '安其', 18, 0, '长安区胜利北街17号石家庄铁道大学', '65432178466', 654787981231545644);
