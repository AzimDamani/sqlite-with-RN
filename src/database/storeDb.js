import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
    {name: 'fakestore.db', location: 'default'},
    () => console.log("Store DB Connnected"),
    (err) => console.error("Store DB connection failed", err)
);

// export const initializeDB = () => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             `CREATE TABLE IF NOT EXISTS products (
//             id INTEGER PRIMARY KEY,
//             title TEXT,
//             price REAL,
//             description TEXT,
//             category TEXT,
//             image TEXT,
//             rating_rate REAL,
//             rating_count INTEGER
//             );`,
//             [],
//             () => console.log("Product table created"),
//             (err) => console.error("Failed to create Product table", err)
//         )
//     })
// }

export const initializeDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY,
                    title TEXT,
                    price REAL,
                    description TEXT,
                    category TEXT,
                    image TEXT,
                    rating_rate REAL,
                    rating_count INTEGER
                );`,
                [],
                () => {
                    console.log("Product table created");
                    resolve();
                },
                (err) => {
                    console.error("Failed to create Product table", err);
                    reject(err);
                }
            );
        });
    });
};


export const cacheProducts = (product) => {
    db.transaction((tx) => {
        tx.executeSql(
            `INSERT OR REPLACE INTO products
            (id, title, price, description, category, image, rating_rate, rating_count)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [product.id,
                product.title,
                product.price,
                product.description,
                product.category,
                product.image,
                product.rating?.rate || 0,
                product.rating?.count || 0,],
            () => console.log(`Product ${product.id} cached`),
            (err) => console.error(`Failed to cache ${product.id}`, err)
        )
    })
}

export const getCachedProducts = (callBack) => {
    db.transaction((tx) => {
        tx.executeSql(
            `SELECT * FROM products;`,
            [],
            (_, {rows}) => callBack(rows.raw()),
            (_, err) => console.error('Failed to fetch products: ', err)
        )
    })
}

export default db;