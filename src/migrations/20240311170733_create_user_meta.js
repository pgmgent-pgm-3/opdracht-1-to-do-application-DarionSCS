const tableName = "user_meta";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("quote", 255);
    table.string("location", 255);
    // declare foreign key
    table.foreign("user_id").references("users.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
