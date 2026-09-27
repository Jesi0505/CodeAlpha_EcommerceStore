const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./database");

const app = express();

const PORT = 3000;
const JWT_SECRET = "codealpha_secret_key_2026";


// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());


// =========================
// Home Route
// =========================

app.get("/", (req, res) => {

    res.json({
        message: "CodeAlpha E-commerce API is running!"
    });

});


// =========================
// GET ALL PRODUCTS
// =========================

app.get("/api/products", (req, res) => {

    db.all(
        "SELECT * FROM products",
        [],
        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json(rows);

        }
    );

});


// =========================
// REGISTER USER
// =========================

app.post("/api/register", async (req, res) => {

    const { name, email, password } = req.body;


    if (!name || !email || !password) {

        return res.status(400).json({
            message: "All fields are required."
        });

    }


    try {

        const hashedPassword =
            await bcrypt.hash(password, 10);


        const sql = `
            INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)
        `;


        db.run(
            sql,
            [name, email, hashedPassword],
            function (err) {

                if (err) {

                    if (err.message.includes("UNIQUE")) {

                        return res.status(409).json({
                            message: "Email already registered."
                        });

                    }

                    return res.status(500).json({
                        error: err.message
                    });

                }


                res.status(201).json({

                    message: "Registration successful.",

                    userId: this.lastID

                });

            }
        );

    } catch (error) {

        res.status(500).json({
            message: "Registration failed."
        });

    }

});


// =========================
// LOGIN USER
// =========================

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;


    if (!email || !password) {

        return res.status(400).json({
            message: "Email and password are required."
        });

    }


    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, user) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }


            if (!user) {

                return res.status(401).json({
                    message: "Invalid email or password."
                });

            }


            const passwordMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );


            if (!passwordMatch) {

                return res.status(401).json({
                    message: "Invalid email or password."
                });

            }


            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );


            res.json({

                message: "Login successful.",

                token: token,

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

            });

        }
    );

});


// =========================
// AUTHENTICATION MIDDLEWARE
// =========================

function authenticateToken(req, res, next) {

    const authHeader =
        req.headers["authorization"];


    const token =
        authHeader &&
        authHeader.split(" ")[1];


    if (!token) {

        return res.status(401).json({
            message: "Authentication required."
        });

    }


    jwt.verify(
        token,
        JWT_SECRET,
        (err, user) => {

            if (err) {

                return res.status(403).json({
                    message: "Invalid or expired token."
                });

            }

            req.user = user;

            next();

        }
    );

}


// =========================
// CREATE ORDER
// =========================

app.post(
    "/api/orders",
    authenticateToken,
    (req, res) => {

        const { items } = req.body;


        if (!items || items.length === 0) {

            return res.status(400).json({
                message: "Order must contain products."
            });

        }


        let total = 0;


        items.forEach(item => {

            total +=
                Number(item.price) *
                Number(item.quantity);

        });


        db.run(
            `
            INSERT INTO orders
            (user_id, total)
            VALUES (?, ?)
            `,
            [req.user.id, total],
            function (err) {

                if (err) {

                    return res.status(500).json({
                        error: err.message
                    });

                }


                const orderId = this.lastID;


                const statement = db.prepare(`
                    INSERT INTO order_items
                    (order_id, product_id, quantity, price)
                    VALUES (?, ?, ?, ?)
                `);


                items.forEach(item => {

                    statement.run(
                        orderId,
                        item.product_id,
                        item.quantity,
                        item.price
                    );

                });


                statement.finalize();


                res.status(201).json({

                    message: "Order placed successfully.",

                    orderId: orderId,

                    total: total

                });

            }
        );

    }
);


// =========================
// GET USER ORDERS
// =========================

app.get(
    "/api/orders",
    authenticateToken,
    (req, res) => {

        db.all(
            `
            SELECT *
            FROM orders
            WHERE user_id = ?
            ORDER BY created_at DESC
            `,
            [req.user.id],
            (err, rows) => {

                if (err) {

                    return res.status(500).json({
                        error: err.message
                    });

                }

                res.json(rows);

            }
        );

    }
);


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});
