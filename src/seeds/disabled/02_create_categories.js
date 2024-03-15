const tableName = "task_categories";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { name: "Work", description: "Tasks that need to be done for work" },
    { name: "Home", description: "Tasks that need to be done at home" },
    { name: "Hobbies", description: "Tasks that need to be done for hobbies" },
    { name: "School", description: "Tasks that need to be done for school" },
    {
      name: "Other",
      description: "Tasks that don't fit into any other category",
    },
  ]);
};

export { seed };
