const express = require('express');
const path = require('path');

const app = express();

// Import Routes
const api_routes = require('./routes/api_routes');
const view_routes = require('./routes/view_routes');

// Middleware - adding a layer to the server "onion" or removing layer from the "onion"
app.use(express.static('./public'));
// Allow form data to be attached in our routes
app.use(express.urlencoded({ extended: false }))

// Load Routes
app.use('/', view_routes);
// When you load in all of the route from api routes.js prefix all of them with '/api' - meaning if my route is something like app.get('/notes'), change that to app.get('/api/notes')
app.use('/api', api_routes);


// The wildcard route MUST be below all other routes
app.get('*', (requestObj, responseObj) => {
    responseObj.sendFile(path.join(__dirname, './public/notfound.html'));
});


app.listen(3333, () => {
    console.log('Server started');
})

