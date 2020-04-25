var beingSaved = false

function sendCurrentFlightDataToBackend(tripbase)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/newtripdata', true);
    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function ()
    { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200)
        { // Request finished. Do processing here.
            updateOldTripInfo()
        }
    }

    xhr.send(JSON.stringify(tripbase));
}

function sendTripInfo(data, listsToSave)
{
    showLoadingScreen()
    if (!data)
    {
        return false
    }
    if (myemail == "")
        return false

    var myTripId;
    console.log('tripid test: ' + data[0].tripid)
    if (data[0].tripid != undefined)
    {
        myTripId = data[0].tripid
    }
    else
    {
        myTripId = JSON.parse(sessionStorage.getItem('old-trips')).length
        var toSaveTravelJson = JSON.parse(sessionStorage.getItem('travel_json'))
        toSaveTravelJson[0].tripid = myTripId
        sessionStorage.setItem('travel_json', JSON.stringify(toSaveTravelJson))
        console.log("------------------------------")
        console.log(JSON.parse(sessionStorage.getItem('travel_json')))
    }

    // normalize list data
    var normalizedListsToSave = []
    let keyList = Object.keys(listsToSave)
    for (var i = 0; i < keyList.length; ++i)
    {
        normalizedListsToSave.push ({name: document.getElementById(keyList[i]).getElementsByTagName("h2")[0].innerHTML, items: listsToSave[keyList[i]]})
    }


    let tripbase = 
    {
        email: myemail,
        tripid: myTripId,
        start_date: data[0].departure.date,
        end_date: data[0].returnDate,
        departure_city: data[0].departure.airport.municipalityName,
        departure_countryCode: data[0].departure.airport.countryCode,
        arrival_city: data[0].arrival.airport.municipalityName,
        arrival_countryCode: data[0].arrival.airport.countryCode,
        lists: normalizedListsToSave
    };
    console.log(tripbase)
    sendCurrentFlightDataToBackend(tripbase)
}

function saveCurrentTrip()
{
    beingSaved = true;
    sendTripInfo(JSON.parse(sessionStorage.getItem('travel_json')), listOfLists);
}

function updateOldTripInfo()
{
    // send a fetch/XHTTP request for old trips
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            oldTrips = JSON.parse(xhttp.response);
            sessionStorage.setItem('old-trips', JSON.stringify(oldTrips))
            console.log('just set old trips')
            hideLoadingScreen()
            setTimeout(function()
            {
                if (beingSaved == true)
                {
                    alert("Save Successful");
                    beingSaved = false;
                }
            }, 100)
            
        }
    };

    xhttp.open("GET", "old-trips", true);

    //send this to backend to get default lists for different number of days
    xhttp.setRequestHeader("email", myemail);
    xhttp.send();
}