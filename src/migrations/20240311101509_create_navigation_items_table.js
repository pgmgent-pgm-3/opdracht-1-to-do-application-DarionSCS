const tableName = "navigation_items";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("label").notNullable();
    table.string("target");
    table.string("url").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
