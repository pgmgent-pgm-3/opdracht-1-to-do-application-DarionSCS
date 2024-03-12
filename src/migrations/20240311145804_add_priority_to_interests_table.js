const tableName = "interests";

export function up(knex) {
  return knex.schema.table(tableName, function (table) {
    table.integer("priority").defaultTo(1);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName, function (table) {
    table.dropColumn("priority");
  });
}
