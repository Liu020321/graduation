create table alembic_version
(
    version_num varchar(32) not null
        primary key
);

INSERT INTO graduation.alembic_version (version_num) VALUES ('a669e891ee83');
