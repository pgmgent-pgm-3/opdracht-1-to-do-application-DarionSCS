const tableName = "seedPages";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  await knex(tableName).insert([
    { title: "Home", slug: "home" },
    { title: "Work", slug: "work" },
    { title: "School", slug: "school" },
  ]);
};

export { seed };
