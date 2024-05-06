
-- +migrate Up
CREATE TABLE IF NOT EXISTS Item (
    item_uuid TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS Images (
    image_uuid TEXT NOT NULL PRIMARY KEY,
    show BOOLEAN NOT NULL,
    item_uuid TEXT NOT NULL
);

-- +migrate Down
DROP TABLE Item;
