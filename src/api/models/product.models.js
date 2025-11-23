import connection from "../database/db.js";

export const selectAllProducts = () => {
        const sql= "SELECT * FROM products";
        return connection.query(sql);
}

export const selectProductwhereId = (id) => {
        let sql= "SELECT * FROM products where id = ?";
        return connection.query(sql, [id]);
}

export const insertProduct = (name, image, category, price) => {
        let sql ="INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
        return connection.query(sql, [name, image, category, price]);
}

export const updateProduct = (name, image, category, price, id) => {
        
        let sql = `
            UPDATE products
            SET name = ?, image = ?, price = ?, category = ?
            WHERE id = ?
        `;
        return connection.query(sql, [name, image, price, category, id]);
}

export const deleteProduct = (id) => {
        let sql = "DELETE FROM products WHERE id = ?";
        return connection.query(sql, [id]);
}