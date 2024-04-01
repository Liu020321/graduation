create table alembic_version
(
    version_num varchar(32) not null
        primary key
);

INSERT INTO graduation.alembic_version (version_num) VALUES ('c05f93bc45db');
