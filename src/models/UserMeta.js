import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import User from "./User.js";

// define the UserMeta model
class UserMeta extends Model {
  // ... (tableName, idColumn, jsonScheme)

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "user_meta.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default UserMeta;
