const pguser = 'postgres';
const pghost = 'localhost';
const pgdatabase = 'postgres';
const pgpassword = '12345';
const pgport = '5432';

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: pguser,
  host: pghost,
  database: pgdatabase,
  password: pgpassword,
  port: pgport,
});

//Example creating a table
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
      id          bigserial UNIQUE,
      nombre      character varying
  );
`);

module.exports = pool;