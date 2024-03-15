const tableName = "task_items";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { title: "Buy groceries", is_done: false, categoryId: 2 },
    { title: "Do laundry", is_done: false, categoryId: 2 },
    { title: "Wash dishes", is_done: false, categoryId: 2 },
    { title: "Piano lesson", is_done: false, categoryId: 3 },
    { title: "Take out the trash", is_done: true, categoryId: 2 },
    { title: "Homework", is_done: true, categoryId: 4 },
  ]);
};

export { seed };
