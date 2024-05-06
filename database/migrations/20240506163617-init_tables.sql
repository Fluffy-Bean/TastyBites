
-- +migrate Up
CREATE TABLE IF NOT EXISTS Item (
       uuid TEXT NOT NULL PRIMARY KEY,
       name TEXT NOT NULL,
       price INTEGER NOT NULL,
       description TEXT
);

-- +migrate Down
DROP TABLE Item;
