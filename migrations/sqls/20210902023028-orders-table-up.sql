CREATE TABLE order_status(
    id SERIAL PRIMARY KEY,
    desc VARCHAR(30)
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    status INTEGER
);

CREATE TABLE order_details(
    order_id INTEGER,
    prod_id INTEGER,
    quantity INTEGER,
    PRIMARY KEY (order_id, prod_id)
);

ALTER TABLE orders ADD FOREIGN KEY (status) REFERENCES order_status(id);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE order_details ADD FOREIGN KEY (order_id) REFERENCES orders(id);
ALTER TABLE order_details ADD FOREIGN KEY (prod_id) REFERENCES products(id);