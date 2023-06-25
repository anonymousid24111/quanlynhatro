const { Pool } = require("pg");
const { Sequelize } = require("sequelize");

const pool = new Pool({
    connectionString: "postgres://postgres:1qaz2wsxE@localhost/quanlynhatro",
});

var sequelize = new Sequelize("postgres://postgres:1qaz2wsxE@localhost/quanlynhatro");

module.exports = {
    pool,
    sequelize,
};
