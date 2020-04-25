var myemail = ""

function onSignIn(googleUser)
{
    var profile = googleUser.getBasicProfile();
    // replace image and names
    var name = document.getElementById('name-label')
    name.innerHTML = profile.getName();
    var image = document.getElementById('profile-image');
    image.src = profile.getImageUrl();
    myemail = profile.getEmail()

    // replace buttons
    document.getElementById("google-signin-button").style.display = "none";
    document.getElementById("logout-button").style.display = "block";

    //log into database
    const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('userauthentication');
    client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user => db.collection('information').updateOne(
        {
            owner_id: client.auth.user.id,
            email: profile.getEmail()
        },
        {
            $set: {
                name: profile.getName(),
                image: profile.getImageUrl()
            }
        },
        {upsert: true}
    )).then(() => db.collection('information').find(
        {
            owner_id: client.auth.user.id,
            email: profile.getEmail()
        },
        {limit: 100}
    ).asArray()).then(docs => {
        console.log("Verifying existance of account")
        console.log("Found account", docs)

        //grab old trips
        updateOldTripInfo();

    }).catch(err => {
        console.error(err)
        return profile.getEmail();
    });

}

// verify dates are valid
function verifyDates(departure_date, end_date)
{ 
    // add 1 to account for day of departure
    var diff = Math.floor((Date.parse(end_date) - Date.parse(departure_date)) / 86400000) + 1;

    //check that dates given are proper calender dates & not a garbage input
    if (isNaN(diff) == true)
    {
        alert("Dates are invalid. Please try again");
        return false;
    }

    //ensure departure date comes before return date
    if (diff < 1)
    {
        alert("Dates are invalid. Please ensure the departure date comes before the return date");
        return false;
    }

    sessionStorage.setItem('day_diff', JSON.stringify(diff));
    return true
}

function createCustomJSON(srcCity, desCity, srcCountryCode, desCountryCode)
{
    travelObj = {

        0: {
            "departure": {
                "airport": {
                    "municipalityName": srcCity,
                    "countryCode": srcCountryCode
                },
                "scheduledTimeLocal": -1,
                "date": document.getElementById("start-date").value
            },

            "arrival": {
                "airport": {
                    "municipalityName": desCity,
                    "countryCode": desCountryCode
                },
                "scheduledTimeLocal": -1
            },

            "returnDate": document.getElementById("return-date").value
        }

    }
    sessionStorage.setItem('travel_json', JSON.stringify(travelObj));
    console.log(travelObj);
    console.log(JSON.stringify(travelObj));
    return travelObj;

}

function addDatesToFlightData(data)
{
    data[0].departure.date = document.getElementById("start-date").value
    data[0].returnDate = document.getElementById("return-date").value
    return data
}

// take input from user drop down boxes
function manualInput()
{

    var departure_date = document.getElementById("start-date").value;
    var end_date = document.getElementById("return-date").value;
    if (verifyDates(departure_date, end_date) == false)
    {
        return;
    }

    var srcCity = document.getElementById("citySrcId");
    var srcCountry = document.getElementById("countrySrcId");

    var desCity = document.getElementById("cityDesId");
    var desCountry = document.getElementById("countryDesId");

    srcCity = srcCity.options[srcCity.selectedIndex].value;
    srcCountry = srcCountry.options[srcCountry.selectedIndex].value;

    desCity = desCity.options[desCity.selectedIndex].value;
    desCountry = desCountry.options[desCountry.selectedIndex].value;

    //catch case where user fails to give city
    if (srcCountry == "" || desCountry == "")
    {
        alert("Error: Please input a country");
        return;
    }

    //catch case where user fails to give city
    if (srcCity == "" || desCity == "")
    {
        alert("Error: Please input a city");
        return;
    }

    var srcCountryCode;
    var desCountryCode;

    var restCountryAPI = 'https://restcountries.eu/rest/v2/name/';

    // grab source country code
    fetch(restCountryAPI + srcCountry,
    {}).then(response => {
        console.log(response);
        return response.json()
    }).then(data => {
        var i = 0;
        console.log(data);
        console.log(srcCountry);

        
        while (srcCountry != data[i].nativeName && srcCountry != data[i].name)
        {
            console.log(i);
            console.log(data[i].nativeName);
            console.log(data[i].name);
            i = i + 1;
        }

        srcCountryCode = data[i].alpha3Code;
        console.log(srcCountryCode);

        // grab destination country code
        fetch(restCountryAPI + desCountry,
        {}).then(response => {
            return response.json()
        }).then(data => {
            var j = 0;
            while (desCountry != data[j].nativeName && desCountry != data[j].name)
            {
                console.log(j);
                console.log(data[j].nativeName);
                console.log(data[j].name);
                j = j + 1;
            }
            console.log(data[j].nativeName);
            console.log(data[j].name);

            desCountryCode = data[j].alpha3Code;
            console.log(data[j].nativeName);
            console.log(desCountryCode);

            console.log(srcCountryCode);
            console.log(desCountryCode);

            createCustomJSON(srcCity, desCity, srcCountryCode, desCountryCode);
            window.location.href = 'tripInfo.html';

        }).catch(err => {
            console.log(err);
            alert("Uh oh, something went wrong. Please try again");
            return
        });

    }).catch(err => {
        console.log(err);
        alert("Uh oh, something went wrong. Please try again");
        return
    });




}


function flightNumberParse()
{
    var departure_date = document.getElementById("start-date").value;
    var end_date = document.getElementById("return-date").value;

    if (verifyDates(departure_date, end_date) == false)
    {
        return
    }

    // take user input of dates and flight number
    var flight_num = document.getElementById("flight-number").value.replace(/\s/g, "");
    console.log(departure_date);
    var flight_api_url = "https://aerodatabox.p.rapidapi.com/flights/" + flight_num + '/' + departure_date + "?withLocation=false&withAircraftImage=false";


    fetch(flight_api_url,
    {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": "a5aeadcc4fmshc5ec51281dba8a2p1ae4a3jsnb29493dd2409"
        }
    }).then(response => {
        return response.json(); // convert to json
    }).then(data => {

        console.log(data);
        var source_city = data[0].departure.airport.municipalityName;
        var destination_city = data[0].arrival.airport.municipalityName;

        var source_countryCode = data[0].departure.airport.countryCode;
        var destination_countryCode = data[0].arrival.airport.countryCode;

        var depart_time_local = data[0].departure.scheduledTimeLocal;

        var arrival_time_local = data[0].arrival.scheduledTimeLocal;

        if (source_city == undefined || destination_city == undefined || source_countryCode == undefined || destination_countryCode == undefined || depart_time_local == undefined || arrival_time_local == undefined)
        {
            alert("Something went wrong with the flight number. Please input your trip details manually or ensure the departure date given matches the one on your booking");
            showManualInfoOptions();
            return;
        }

        
        // store json for analysis in tripInfo.js
        sessionStorage.setItem('travel_json', JSON.stringify(addDatesToFlightData(data)));
        showLoadingScreen();
        window.location.href = 'tripInfo.html';
    }).catch(err => {
        console.log(err);

        alert("Something went wrong with the flight number. Please input your trip details manually.");
        showManualInfoOptions();
    });
}