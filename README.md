Introduction:
This is a webserver that allows you to create tasks linked to categories of your choice. You can register and login.
The page itself is made by templating with handlebars, for the server we use NodeJS and Express.
Knex & Objection with sqlite3 to save and manage data.
JWT for client-server authentication.
Bcrypt is used to encode/decode passwords.
Cookie-parser is used to save cookies to remember logins.

Instructions:

1. run "npm i" to install node modules.
2. run "npx knex migrate:latest" to create the sqlite3 database.
3. Open the "migrations" folder and relocate the only disabled migration file to it's parent folder. This is to add a categoryId to the tasks
4. run "npx knex migrate:latest" again
5. run "npx knex seed:run" for some temporary data
6. You are ready to start the server by using the "npm run start" command

Feature Overview:

- CRUD for tasks and categories (also for the API)
- Login that uses a cookie to remember your login and doesn't allow you on the home page if not logged in. Register encrypts your password.
- Only admins can make changes.
- Sort on categories.

API usage:

- To Delete, Put or get by ID:
  /tasks/:id
  /categories/:id

- For Get/Post:
  /tasks
  /categories

author: daria habibi
