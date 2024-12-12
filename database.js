import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    await dbRun("DROP TABLE products")
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, picture TEXT, price REAL)");

    const products = [
         { name: "játékautó", description: "kicsi", picture: "piros kicsi játékauto", price: 1200 },
         { name: "könyv", description: "200 oldal", picture: "200 oldalas töri könyv", price: 4300 },
         { name: "pulúver", description: "L méretű", picture: "L méretű téli pulóver", price: 12000 },
    ];

    for (const product of products) {
         await dbRun("INSERT INTO products (name, description, picture, price) VALUES (?, ?, ?, ?)", [product.name, product.description, product.picture, product.price]);
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };
