const tableName = "task_items";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.boolean("is_done").defaultTo(false);
    table.integer("categoryId").unsigned().notNullable().defaultTo(5);
    table.foreign("categoryId").references("categories.id");
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
