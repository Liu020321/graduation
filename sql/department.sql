create table department
(
    id                  int auto_increment
        primary key,
    name                varchar(100) not null,
    description         varchar(255) null,
    department_code     varchar(20)  null,
    department_director varchar(100) null,
    establishment_date  date         null,
    address             varchar(255) null,
    phone               varchar(20)  null,
    constraint department_code
        unique (department_code)
);

INSERT INTO graduation.department (id, name, description, department_code, department_director, establishment_date, address, phone) VALUES (1, '内科', '负责人：李医生', 'DEP001', '张医生', '1990-01-01', 'XX街道XX号', '123456789');
INSERT INTO graduation.department (id, name, description, department_code, department_director, establishment_date, address, phone) VALUES (2, '外科', '负责人：王医生', 'DEP002', '王医生', '1992-03-15', 'XX路XX号', '987654321');
INSERT INTO graduation.department (id, name, description, department_code, department_director, establishment_date, address, phone) VALUES (3, '儿科', '负责人：赵医生', 'DEP003', '赵医生', '1995-07-20', 'XX大道XX号', '456123789');
