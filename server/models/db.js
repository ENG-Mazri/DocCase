const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "coPyhhh12",
    host: "localhost",
    port: 5432,
    database: "docs" 
})

module.exports = pool;