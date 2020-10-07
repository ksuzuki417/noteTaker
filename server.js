//Dependencies
var express = require("express");
var path = require("path");
var fs = require ("fs");
var util = require ("util");
const { response } = require("express");

//Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;

//Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Basic route that sends the user first to the AJAX page


app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "/public/index.html")); 
});

app.get("/notes", function (request, response) {
    response.sendFile(path.join(__dirname, "/public/notes.html"));
});

//API routes - return all saved notes as JSON
app.get("/api/notes", function (request, response) {
    response.sendFile(path.join(__dirname, "db/db.json"))
});

//API routes - saving new notes to db.json
app.post("/api/notes", function (request, response) {
    var savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    var newNotes = request.body;
    var noteId = noteId;
    savedNotes.push(newNotes);

    fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
    console.log("Note is saved!")
    response.json(savedNotes);

});

//API routes - deleting notes
app.delete("/api/notes", function(request, response){
    var savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    var noteId =request.param.id;
    console.log("note is deleted");
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteId;
    })

    writeFile("db/db.json", JSON.stringify(savedNotes));
    response.json(savedNotes);
});


//Listener - starts our server
app.listen(PORT, function () {
    console.log("App is listening on: http://localhost:" + PORT);
    
})