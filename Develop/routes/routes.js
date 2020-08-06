const fs = require('fs');
const path = require('path');


module.exports = app => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // Routes for API
        // =============================================

        // Get route for /api/notes then read the db.json and return all saved notes as JSON.
        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        // Post route for /api/notes
        app.post("/api/notes", function (req, res) {

            // * The application should have a `db.json` file on the backend that will be used to store and retrieve notes
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });

        app.get("/api/notes/:id", function (req, res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Deletes a note with specific id
        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id,);
        });

        // View Routes

        // * GET `/notes` - Should return the `notes.html` file.
        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "/public/notes.html"));
        });

        //   * GET `*` - Should return the `index.html` file
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "/public/index.html"));
        });

        //updates the json file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("./db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });
}