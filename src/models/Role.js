import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import User from "./User.js";

// define the UserMeta model
class Role extends Model {
  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "slug"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        slug: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "roles.id",
          to: "users.role_id",
        },
      },
    };
  }
}

export default Role;
