import sql from 'better-sqlite3';

const db = sql('products.db');

export function getProducts() {
    // new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM products').all();
}