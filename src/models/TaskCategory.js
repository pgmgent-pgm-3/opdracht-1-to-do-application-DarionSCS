import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// define the TaskCategory model
class TaskCategory extends Model {
  static get tableName() {
    return "task_categories";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
  //relations here
  static get relationMappings() {
    const TaskItem = require("./TaskItem").default;
    return {
      taskItems: {
        relation: Model.HasManyRelation,
        modelClass: TaskItem,
        join: {
          from: "task_categories.id",
          to: "task_items.categoryId",
        },
      },
    };
  }
}

export default TaskCategory;
