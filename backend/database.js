const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./ecommerce.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});


db.serialize(() => {

    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);


    // Products table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            image TEXT
        )
    `);


    // Orders table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            total REAL NOT NULL,
            status TEXT DEFAULT 'Placed',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);


    // Order items table
    db.run(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `);


    // Add sample products
    db.get(
        "SELECT COUNT(*) AS count FROM products",
        (err, row) => {

            if (err) {
                console.error(err.message);
                return;
            }

            if (row.count === 0) {

                const products = [

                    [
                        "Running Shoes",
                        1999,
                        "Comfortable running shoes for everyday use.",
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                    ],

                    [
                        "Smart Watch",
                        2499,
                        "Smart watch with fitness and notification features.",
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                    ],

                    [
                        "Wireless Headphones",
                        1499,
                        "Wireless headphones with clear sound quality.",
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                    ],

                    [
                        "Digital Camera",
                        8999,
                        "Compact digital camera for photography.",
                        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500"
                    ],

                    [
                        "Android Tablet",
                        12999,
                        "Portable tablet for entertainment and productivity.",
                        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"
                    ],

                    [
                        "Laptop",
                        54999,
                        "Powerful laptop for work and study.",
                        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
                    ]

                ];


                const statement = db.prepare(`
                    INSERT INTO products
                    (name, price, description, image)
                    VALUES (?, ?, ?, ?)
                `);


                products.forEach(product => {
                    statement.run(product);
                });


                statement.finalize();

                console.log("Sample products added.");
            }
        }
    );

});


module.exports = db;
