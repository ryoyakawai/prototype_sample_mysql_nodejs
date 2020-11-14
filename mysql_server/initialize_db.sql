CREATE TABLE merchandise_type_master (
  merchandise_type_master_seq BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
  merchandise_type_name VARCHAR(255),
  merchandise_color VARCHAR(255),
  created_date TIMESTAMP not null default current_timestamp,
  updated_date TIMESTAMP not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (merchandise_type_master_seq)
);
CREATE TABLE merchandise_master (
  merchandise_master_seq BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
  merchandise_name VARCHAR(255),
  merchandise_type_master_seq BIGINT UNSIGNED,
  created_date TIMESTAMP not null default current_timestamp,
  updated_date TIMESTAMP not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (merchandise_master_seq),
  FOREIGN KEY (merchandise_type_master_seq) REFERENCES merchandise_type_master(merchandise_type_master_seq)
);
CREATE TABLE merchandise_quantity_master (
  merchandise_quantity_master_seq BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
  merchandise_master_seq BIGINT UNSIGNED,
  merchandise_quantity INT UNSIGNED NOT NULL,
  created_date TIMESTAMP not null default current_timestamp,
  updated_date TIMESTAMP not null default current_timestamp on update current_timestamp,
  PRIMARY KEY (merchandise_quantity_master_seq),
  FOREIGN KEY (merchandise_master_seq) REFERENCES merchandise_master(merchandise_master_seq)
);
/** merchandise_type_master **/
INSERT INTO merchandise_type_master (merchandise_type_name, merchandise_color) VALUES ("Cabernet Sauvignon", "Red");
INSERT INTO merchandise_type_master (merchandise_type_name, merchandise_color) VALUES ("Zinfandel", "Red");
INSERT INTO merchandise_type_master (merchandise_type_name, merchandise_color) VALUES ("Shiraz", "Red");
INSERT INTO merchandise_type_master (merchandise_type_name, merchandise_color) VALUES ("Pinot noir", "Red");
INSERT INTO merchandise_type_master (merchandise_type_name, merchandise_color) VALUES ("Chardonnay", "Red");
INSERT INTO merchandise_type_master (merchandise_type_name, merchandise_color) VALUES ("Chardonnay", "White");
INSERT INTO merchandise_type_master (merchandise_type_name, merchandise_color) VALUES ("Sauvignon blanc", "Wiite");
