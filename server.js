const express = require('express');
const path = require('path');

const app = express();

// Middleware - adding a layer to the server "onion" or removing layer from the "onion"
app.use(express.static('./public'));


app.get('/about', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/about.html'));
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

