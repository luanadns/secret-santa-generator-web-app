
DROP TABLE if exists presents;
DROP TABLE if exists lists;

CREATE TABLE lists (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  owner VARCHAR(20),
  name VARCHAR(30)
);

CREATE TABLE presents (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20),
  url VARCHAR(500),
  list_id int NOT NULL
);

ALTER TABLE presents
ADD FOREIGN KEY (list_id) REFERENCES lists(id);

INSERT INTO lists(owner, name) VALUES ('Luana', 'Secret Santa');
INSERT INTO lists(owner, name) VALUES ('Andres', 'Birthday');

INSERT INTO presents(name, url, list_id) VALUES ('Ball', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Football_%28soccer_ball%29.svg/1927px-Football_%28soccer_ball%29.svg.png', 1);
INSERT INTO presents(name, url, list_id) VALUES ('Iphone', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204', 1);

INSERT INTO presents(name, url, list_id) VALUES ('Apple watch', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MP6V3ref_VW_34FR+watch-40-alum-silver-nc-se_VW_34FR_WF_CO_GEO_ES?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1660779457078%2C1661473320610', 2);