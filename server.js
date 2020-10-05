//Dependencies
var express = require("express");
var path = require("path");

//Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Basic route that sends the user first to the AJAX page
app.get("/", function (request, response) {
    response.sendfile(path.join(__dirname, "/public/index.html"));    
});

app.get("/notes", function (request, response) {
    response.sendfile(path.join(__dirname, "/public/notes.html"));
});

//API routes - return all saved notes as JSON
app.get("/api/notes", function (request, response) {
    return response.json(savedNotes);
})

//API routes - saving new notes to db.json
app.post("/api.notes", function (request, response) {
    var newNotes = req.body;

    console.log(newNotes);

    savedNotes.push(newNotes);

    response.json(newNotes);
});


//Listener - starts our server
app.listen(PORT, function () {
    console.log("App is listening on: http://localhost:" + PORT);
    
})