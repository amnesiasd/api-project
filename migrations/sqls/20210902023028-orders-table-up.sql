CREATE TABLE order_status(
    id SERIAL PRIMARY KEY,
    dbstatus VARCHAR(30)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    dbstatus INTEGER
);

CREATE TABLE order_products(
    order_id INTEGER,
    prod_id INTEGER,
    quantity INTEGER,
    PRIMARY KEY (order_id, prod_id)
);

ALTER TABLE orders ADD FOREIGN KEY (dbstatus) REFERENCES order_status(id);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE order_products ADD FOREIGN KEY (order_id) REFERENCES orders(id);
ALTER TABLE order_products ADD FOREIGN KEY (prod_id) REFERENCES products(id);