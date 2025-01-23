require('dotenv').config();

const { Pool } = require('pg');

// Log the DATABASE_URL to make sure it's being loaded properly
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Ensure that SSL is enabled and allows connections
    }
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query:', err.stack);
    } else {
        console.log('Query result:', res.rows);
    }
    pool.end(); // Close connection
});
