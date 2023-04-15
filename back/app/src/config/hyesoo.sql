CREATE TABLE USERS (
   id VARCHAR(30) PRIMARY KEY,
   mail VARCHAR(100) null,
   name VARCHAR(15) NOT NULL,
   phone varchar(13) not null,
   psword VARCHAR(255) NOT NULL,
   salt varchar(255)
);
CREATE TABLE image (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  data LONGBLOB
);