const tableName = "task_categories";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
