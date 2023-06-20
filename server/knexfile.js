// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: "quanlynhatro",
            user: "postgres",
            password: "1qaz2wsxE",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "users",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "quanlynhatro",
            user: "postgres",
            password: "1qaz2wsxE",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "users",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: "quanlynhatro",
            user: "postgres",
            password: "1qaz2wsxE",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "users",
        },
    },
};
