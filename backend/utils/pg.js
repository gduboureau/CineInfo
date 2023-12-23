import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DATABASE_PORT,
});

const db = {
    query: (text, params) => {
        return pool.query(text, params)
    }
  };
  
export default db;