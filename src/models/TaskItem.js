import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

import TaskCategory from "./TaskCategory.js";

// define the TaskItem model
class TaskItem extends Model {
  static get tableName() {
    return "task_items";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        is_done: { type: "boolean" },
        categoryId: { type: "integer" },
      },
    };
  }
  //relations here
  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: TaskCategory,
        join: {
          from: "task_items.categoryId",
          to: "task_categories.id",
        },
      },
    };
  }
}

export default TaskItem;
