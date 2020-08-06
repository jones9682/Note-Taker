// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
// Using the `fs` module
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Require routes file
require('./routes/routes')(app);

// Setup listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});












// fs read and fs write.

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
//   and then return the new note to the client.

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
//   This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, 
//   you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
