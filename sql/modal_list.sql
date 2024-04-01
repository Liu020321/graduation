create table modal_list
(
    id          int auto_increment
        primary key,
    image_id    int          not null,
    description varchar(255) not null,
    image       varchar(255) not null,
    image_time  datetime     not null,
    constraint modal_list_ibfk_1
        foreign key (image_id) references medical_picture (id)
);

create index image_id
    on modal_list (image_id);

INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (8, 1, '有一点小问题，影响不大。', '/static/assets/images/Pictures/1/2024-03-26_20_06_image.png', '2024-03-26 20:06:00');
INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (9, 1, '测试代码', '/static/assets/images/Pictures/1/2024-03-29_18_39_image.png', '2024-03-29 18:39:00');
INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (10, 1, '234566骄傲的沙克', '/static/assets/images/Pictures/1/2024-03-29_20_19_image.png', '2024-03-29 20:19:00');
INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (12, 4, '模拟数据', '/static/assets/images/Pictures/4/2024-03-30_18_22_image.png', '2024-03-30 18:22:00');
INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (13, 2, '这个世界就是一个巨大的笑话，我们都是bug。', '/static/assets/images/Pictures/2/2024-03-31_14_55_image.png', '2024-03-31 14:55:00');
INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (14, 4, '测试八零', '/static/assets/images/Pictures/4/2024-03-31_15_00_image.png', '2024-03-31 15:00:00');
INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (15, 5, '134564597841132156da56aa561d3', '/static/assets/images/Pictures/5/2024-03-31_18_29_image.png', '2024-03-31 18:29:00');
INSERT INTO graduation.modal_list (id, image_id, description, image, image_time) VALUES (16, 5, '中华省市', '/static/assets/images/Pictures/5/2024-03-31_18_29_image.png', '2024-03-31 18:29:00');
