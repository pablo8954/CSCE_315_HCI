
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

function sendTripInfo(data, lists)
{
    let tripbase = 
    {
        departure_date: data[0].departure.date,
        end_date: endDate,
        source_city: sourceCity,
        source_country: sourceCountry,
        destination_city: destinationCity,
        destination_country: destinationCountry,
        lists: listsToSave
    };

    sendCurrentFlightDataToBackend(tripbase)
}

function updateOldTripInfo()
{
    // send a fetch request for old trips
    // store old trips in a global variable
    // call the function to update old trip information
}