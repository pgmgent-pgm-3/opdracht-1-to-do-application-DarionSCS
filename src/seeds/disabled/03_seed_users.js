const tableName = "users";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { id: 1, firstname: "John", lastname: "Doe" },
    { id: 2, firstname: "Jane", lastname: "Doe" },
    { id: 3, firstname: "Jim", lastname: "Doe" },
    { id: 4, firstname: "Jill", lastname: "Doe" },
    { id: 5, firstname: "Jack", lastname: "Doe" },
  ]);
};

export { seed };
