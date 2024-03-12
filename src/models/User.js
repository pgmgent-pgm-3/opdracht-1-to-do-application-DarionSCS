import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

// related models
import UserMeta from "./UserMeta.js";

// define the User model
class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstname", "lastname"],
      properties: {
        id: { type: "integer" },
        firstname: { type: "string", minLength: 1, maxLength: 255 },
        lastname: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      meta: {
        relation: Model.HasOneRelation,
        modelClass: UserMeta,
        join: {
          from: "users.id",
          to: "user_meta.user_id",
        },
      },
      pets: {
        relation: Model.HasManyRelation,
        modelClass: Pet,
        join: {
          from: "users.id",
          to: "pets.owner_id",
        },
      },
      interests: {
        relation: Model.ManyToManyRelation,
        modelClass: Interest,
        join: {
          from: "users.id",
          through: {
            from: "interest_user.user_id",
            to: "interest_user.interest_id",
          },
          to: "interests.id",
        },
      },
    };
  }
}

export default User;
