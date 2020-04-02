var express = require('express'); // Get the express module
var app = express(); // Start the app
var path = require('path');

app.use('/frontEnd', express.static(__dirname + '/frontEnd'));

app.get('/', function (req, res) // When server requests '/' page
{
    res.sendFile(path.join(__dirname + '/frontEnd/html/index.html'));
});

app.get('/newTrip.html', function (req, res)
{
    res.sendFile(path.join(__dirname + '/frontEnd/html/newTrip.html'));
});

app.get('/oldTrips.html', function (req, res)
{
    res.sendFile(path.join(__dirname + '/frontEnd/html/oldTrips.html'));
});

app.get('/tripInfo.html', function (req, res)
{
    // This one's gonna need some information about the trip too
    res.sendFile(path.join(__dirname + '/frontEnd/html/tripInfo.html'));
});

app.get('/profile.html', function (req, res)
{
    res.sendFile(path.join(__dirname + '/frontEnd/html/profile.html'));
});

app.listen(3000, function () 
{
    console.log('Example app listening on port 3000!');
});