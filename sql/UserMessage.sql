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
