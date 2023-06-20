/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("userprofile", function (table) {
        table.increments("id");
        table.string("username", 255).notNullable();
        table.string("password", 255).notNullable();
        table.string("phone", 255).notNullable();
        table.integer("role", 10).notNullable();
    });
    // .createTable("products", function (table) {
    //     table.increments("id");
    //     table.decimal("price").notNullable();
    //     table.string("name", 1000).notNullable();
    // });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("userprofile");
};
