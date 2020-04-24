
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
    let tripbase = 
    {
        email: myemail,
        departure_date: data[0].departure.date,
        end_date: data[0].returnDate,
        source_city: data[0].departure.airport.municipalityName,
        source_country: data[0].departure.airport.countryCode,
        destination_city: data[0].arrival.airport.municipalityName,
        destination_country: data[0].arrival.airport.countryCode,
        lists: listsToSave
    };
    console.log(tripbase)
    // sendCurrentFlightDataToBackend(tripbase)
}

function updateOldTripInfo()
{
    // send a fetch request for old trips
    // store old trips in a global variable
    // call the function to update old trip information
}