import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});


export const checkDbConnection = async () => {
    try {
        // Attempt to get a connection from the pool
        const connection = await pool.getConnection();

        // If connection is successful
        console.log('Database connected successfully!');

        // Release the connection back to the pool
        connection.release();
    } catch (error) {
        // If there was an error connecting to the database
        console.error('Database connection failed:', error);
    }
};