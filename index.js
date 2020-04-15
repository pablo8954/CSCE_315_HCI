var express = require('express'); // Get the express module
var app = express(); // Start the app
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongourl = 'mongodb+srv://mongoaccessaccount:PackAdvisor123@packadvisordatabase-hp7rv.gcp.mongodb.net/test?retryWrites=true&w=majority';

app.use('/frontEnd', express.static(__dirname + '/frontEnd'));

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Connection Established");
//     console.log("Switched to " + db.databaseName + " database");
//     // var doc = {name: "Maccoy Merrell", googleid: "12616121313"};
//     // var dbo = db.db("users")
//     // dbo.collection("google").insertOne(doc,function(err,res)
//     // {
//     // if (err) throw err;
//     // console.log("Document inserted");
    
    
//     dbo.collection("google").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         dbo.close();
//     });
//     // });
// });


app.get('/', function (req, res) // When server requests '/' page
{
    res.sendFile(path.join(__dirname + '/frontEnd/html/index.html'));
});

app.get('/newTrip.html', function (req, res)
{
    res.sendFile(path.join(__dirname + '/frontEnd/html/newTrip.html'));
});

app.get('/tripInfo.html', function (req, res)
{
    // This one's gonna need some information about the trip too
    res.sendFile(path.join(__dirname + '/frontEnd/html/tripInfo.html'));
});


let port = process.env.PORT;
if (port == null || port == "") 
{
    port = 3000;
}
app.listen(port);