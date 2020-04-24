
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var path = require('path');
var mongodb = require('mongodb');
var countryNames = require('countrynames');
var mongourl = 'mongodb+srv://mongoaccessaccount:PackAdvisor123@packadvisordatabase-hp7rv.gcp.mongodb.net/test?retryWrites=true&w=majority';
const mongoClient = mongodb.MongoClient(mongourl);

var listOfLists = {};

// Called once to setup the mongo client
async function dbSetup()
{
    await mongoClient.connect();
    // Setting these statically because they're not gonna change usually
    // If they do, we need to restart the server
    setListOfDefaultLists();
}

async function setListOfDefaultLists()
{
    mongoClient.db('users').collection("lists").find({email: "johnsmith@gmail.com"}).toArray(function(err, result) 
    {
        if (err) throw err;

        var lists = result[0].lists;
        // Go through the results and assign the lists
        for (var i = 0; i < lists.length; ++i)
        {
            listOfLists[lists[i].name] = lists[i].items;
            for (var j = 0; j < listOfLists[lists[i].name].length; ++j)
            {
                listOfLists[lists[i].name][j] = {name: lists[i].items[j], checked: false};
            }
        }
    });
}

dbSetup();

app.use('/frontEnd', express.static(__dirname + '/frontEnd'));

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

app.get('/default-lists', function (req, res)
{
    // let 5 days be default duration of journey
    var numDays = 5;
    if (req.headers.numdays)
    {
        numDays = parseInt(req.headers.numdays);
    }

    res.json(getDefaultLists(numDays));
});

function getDefaultLists(numDays)
{
    if (numDays == 5)
        return listOfLists;
    var toReturn = JSON.parse(JSON.stringify(listOfLists));

    var normalizedDays = Math.min(numDays, 10);

    // Do some number of days specific stuff here for the lists
    toReturn["Clothing"][0].name = normalizedDays + " " + toReturn["Clothing"][0].name;
    toReturn["Clothing"][1].name = normalizedDays + " " + toReturn["Clothing"][1].name
    toReturn["Clothing"][2].name = (normalizedDays + 1) + " " + toReturn["Clothing"][2].name
    toReturn["Clothing"][3].name = normalizedDays + " " + toReturn["Clothing"][3].name
    toReturn["Clothing"][4].name = Math.ceil(normalizedDays / 2) + " " + toReturn["Clothing"][4].name

    return toReturn;
}

app.post('/newtripdata', function (req, res)
{
   console.log(req.body)
  res.send("success")
});

let port = process.env.PORT;
if (port == null || port == "") 
{
    port = 3000;
}
app.listen(port);