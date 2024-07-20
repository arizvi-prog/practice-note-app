const express = require('express');
const path = require('path');

const app = express();
const notes = [
    {
        id: 1,
        text: 'Note One'
    },
    {
        id: 2,
        text: 'Note Two'
    }
];

// Middleware - adding a layer to the server "onion" or removing layer from the "onion"
app.use(express.static('./public'));

// View Routes
app.get('/about', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/.about.html'));
});

app.get('/note', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/note.html'));
});

// API Routes
app.get('/api/notes', (requestObj, responseObj) => {
    responseObj.json(notes);
});

app.get('/api/note/:noteId', (requestObj, responseObj) => {
    const id = requestObj.params.noteId;

    const note = notes.find(noteObj => noteObj.id == id);

    responseObj.json(note || {});
});

app.get('*', (equestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/notfound.html'));
});


// The wildcard route MUST be below all other routes
app.listen(3333, () => {
    console.log('Server started');
})












// app.get('/', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/index.html'));
// });



// about one would go here

// app.get('/images/sad-dino.jpeg', (equestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/images/sad-dino.jpeg'));
// });

// app.get('/css/style.css', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/css/style.css'));
// });

