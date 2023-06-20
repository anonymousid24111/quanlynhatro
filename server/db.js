const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://postgres:1qaz2wsxE@localhost/quanlynhatro",
});

module.exports = {
    pool,
};
