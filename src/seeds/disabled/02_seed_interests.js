const tableName = "interests";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { name: "Music", priority: 1 },
    { name: "Reading", priority: 2 },
    { name: "Sports", priority: 3 },
    { name: "Travel", priority: 4 },
    { name: "Cooking", priority: 5 },
    { name: "Gardening", priority: 6 },
  ]);
};

export { seed };
