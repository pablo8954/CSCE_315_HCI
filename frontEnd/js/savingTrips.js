
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

        }
    }

    xhr.send(JSON.stringify(tripbase));
}

function sendTripInfo(data, listsToSave)
{
    if (!data)
    {
        console.log('works')
        return false
    }
    if (myemail == "")
        return false
    let tripbase = 
    {
        email: myemail,
        tripid: 1,
        start_date: data[0].departure.date,
        end_date: data[0].returnDate,
        departure_city: data[0].departure.airport.municipalityName,
        departure_countryCode: data[0].departure.airport.countryCode,
        arrival_city: data[0].arrival.airport.municipalityName,
        arrival_countryCode: data[0].arrival.airport.countryCode,
        lists: listsToSave
    };
    console.log(tripbase)
    sendCurrentFlightDataToBackend(tripbase)
}

function updateOldTripInfo()
{
    // send a fetch request for old trips
    // store old trips in a global variable
    // call the function to update old trip information
}