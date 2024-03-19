create table medical_picture
(
    id           int auto_increment
        primary key,
    imageType    varchar(20)  not null,
    uploadTime   datetime     not null,
    description  varchar(255) not null,
    medicalImage varchar(255) not null,
    isDoing      tinyint(1)   null,
    user_id      int          not null,
    constraint medical_picture_ibfk_1
        foreign key (user_id) references user (id)
);

create index user_id
    on medical_picture (user_id);

INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (1, '心脏', '2024-03-18 11:07:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/刘海涛_21_2024-03-18_11_07/output/刘海涛_21_2024-03-18_11_07.nii.gz', 0, 1);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (2, '肺肿瘤', '2024-03-18 11:22:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/张长弓_25_2024-03-18_11_22/output/张长弓_25_2024-03-18_11_22.nii.gz', 0, 2);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (3, '多器官', '2024-03-18 13:08:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/王子李_32_2024-03-18_13_08/output/王子李_32_2024-03-18_13_08.nii.gz', 0, 3);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (4, '椎骨', '2024-03-18 14:17:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/刘海涛_21_2024-03-18_14_17/output/刘海涛_21_2024-03-18_14_17.nii.gz', 0, 1);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (5, '肺部', '2024-03-18 23:18:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/刘海涛_21_2024-03-18_23_18/output/刘海涛_21_2024-03-18_23_18.nii.gz', 0, 1);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (6, '肺部', '2024-03-18 23:31:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/张长弓_25_2024-03-18_23_31/output/张长弓_25_2024-03-18_23_31.nii.gz', 0, 2);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (7, '肺部', '2024-03-18 23:41:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/王子李_32_2024-03-18_23_41/output/王子李_32_2024-03-18_23_41.nii.gz', 0, 3);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (8, '肺肿瘤', '2024-03-18 23:50:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/刘海涛_21_2024-03-18_23_50/output/刘海涛_21_2024-03-18_23_50.nii.gz', 0, 1);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (9, '心脏', '2024-03-18 23:55:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/王子李_32_2024-03-18_23_55/output/王子李_32_2024-03-18_23_55.nii.gz', 0, 3);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (10, '肺部', '2024-03-19 00:12:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/刘海涛_21_2024-03-19_00_12/output/刘海涛_21_2024-03-19_00_12.nii.gz', 0, 1);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (11, '心脏', '2024-03-19 12:35:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/张长弓_25_2024-03-19_12_35/output/张长弓_25_2024-03-19_12_35.nii.gz', 0, 2);
INSERT INTO graduation.medical_picture (id, imageType, uploadTime, description, medicalImage, isDoing, user_id) VALUES (26, '肺肿瘤', '2024-03-19 15:39:00', '你要我怎么说怎么做，才能爱我？这就是爱~~~不离不弃不分开不痛快，忘掉一切的烦恼不开怀。', 'medical/刘海涛_21_2024-03-19_15_39/output/刘海涛_21_2024-03-19_15_39.nii.gz', 0, 1);
