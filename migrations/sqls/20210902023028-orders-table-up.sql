CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    prod_id INTEGER,
    quantity INTEGER,
    user_id INTEGER,
    status VARCHAR(30)
);

ALTER TABLE orders ADD FOREIGN KEY (prod_id) REFERENCES products(id);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);