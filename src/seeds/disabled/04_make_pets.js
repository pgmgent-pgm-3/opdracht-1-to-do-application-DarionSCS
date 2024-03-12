const tableName = "pets";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { id: 1, name: "Bruno", species: "Husky", age: 3, owner_id: 1 },
    { id: 2, name: "Buddy", species: "Golden Retriever", age: 2, owner_id: 2 },
    { id: 3, name: "Max", species: "Pug", age: 1, owner_id: 1 },
    { id: 4, name: "Charlie", species: "Beagle", age: 2, owner_id: 1 },
    { id: 5, name: "Cooper", species: "Bulldog", age: 3, owner_id: 5 },
  ]);
};

export { seed };
