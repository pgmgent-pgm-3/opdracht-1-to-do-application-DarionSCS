const tableName = "task_items";

export function up(knex) {
  return knex.schema.table(tableName, function (table) {
    table.integer("categoryId").unsigned().notNullable().defaultTo(5);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName, function (table) {
    table.dropColumn("categoryId");
  });
}
