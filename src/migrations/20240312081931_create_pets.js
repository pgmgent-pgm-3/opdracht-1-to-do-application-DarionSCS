const tableName = "pets";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("species").notNullable();
    table.string("age").notNullable();
    table.integer("owner_id").notNullable();

    // Foreign Key
    table.foreign("owner_id").references("users.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
