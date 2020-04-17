function onSignIn(googleUser)
{
    var profile = googleUser.getBasicProfile();

    //replace image and names
    var name = document.getElementById('name-label')
    name.innerHTML = profile.getName();
    var image = document.getElementById('profile-image');
    image.src = profile.getImageUrl();

    //replace buttons
    document.getElementById("google-signin-button").style.display="none";
    document.getElementById("logout-button").style.display="block";
    
}

function flightNumberParse(){

    //take user input of dates and flight number
    var flight_num = document.getElementById("flight-number").value.replace(/\s/g, "");
    var departure_date = document.getElementById("start-date").value;
    var end_date = document.getElementById("return-date").value;

    //verify dates are valid    
    diff = Math.floor((Date.parse(end_date) - Date.parse(departure_date) )/ 86400000) + 1; //add 1 to account for day of departure
    sessionStorage.setItem('day_diff', JSON.stringify(diff)); //TODO: error check that date difference is not negative
    console.log(diff);

    var flight_api_url = "https://aerodatabox.p.rapidapi.com/flights/" + flight_num + '/' + departure_date + "?withLocation=false&withAircraftImage=false";    

    //window.location.href = 'tripInfo.html'; //- leave commented unless want to skip new trip page

    fetch(flight_api_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": "74af4218f0msh230f6d471685153p1b4bc6jsn758dfbb4cccb"
        }
    })

        .then(response => {
            console.log(response);
            return response.json(); //convert to json
        })

        .then(data => {
            var source_city = data[0].departure.airport.municipalityName;
            var destination_city = data[0].arrival.airport.municipalityName;

            var source_countryCode = data[0].departure.airport.countryCode;
            var destination_countryCode = data[0].arrival.airport.countryCode;

            console.log(source_city);
            console.log(destination_city);
            console.log(source_countryCode);
            console.log(destination_countryCode);

            // alert("PAUSE");
           
            //store json for analysis in tripInfo.js
            sessionStorage.setItem('travel_json', JSON.stringify(data));
            window.location.href = 'tripInfo.html';
        })

        .catch(err => {
            console.log(err);
        });
}