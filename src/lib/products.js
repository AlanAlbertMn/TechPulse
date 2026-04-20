import sql from 'better-sqlite3';

const db = sql('techpulse.db');

export function getProducts() {
	// new Promise((resolve) => setTimeout(resolve, 2000));
	return db.prepare('SELECT * FROM products').all();
}

export function getProduct(asin) {
	console.log(asin);

	// new Promise((resolve) => setTimeout(resolve, 2000));
	return db.prepare('SELECT * FROM products WHERE asin = ?').get(asin);
}
