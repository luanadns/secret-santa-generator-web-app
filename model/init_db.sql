DROP TABLE if exists lists;
DROP TABLE if exists presents;

CREATE TABLE lists{
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    owner VARCHAR(20),
    name VARCHAR(30);
}

CREATE PRESENTS TABLE {
    id int NOT NULL;
    userid INT NOT NULL;
    name VARCHAR(20);
    url VARCHAR(500);
}
