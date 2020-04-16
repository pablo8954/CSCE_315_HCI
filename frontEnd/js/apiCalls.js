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
    var flight_num = document.getElementById("flight-number").value.replace(/\s/g, "");
    var departure_date = document.getElementById("start-date").value;
    // console.log(flight_num);
    // console.log(departure_date);
   
    var flight_api_url = "https://aerodatabox.p.rapidapi.com/flights/" + flight_num + '/' + departure_date + "?withLocation=false&withAircraftImage=false";    
    //var flight_api_url = 'https://aerodatabox.p.rapidapi.com/flights/UA624/2020-05-21?withLocation=false&withAircraftImage=false';
    //console.log(flight_api_url);

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
           
            console.log(data[0].departure.airport);
            console.log(data[0].arrival.airport);

            sessionStorage.setItem('travel_json', data);
            window.location.href = 'tripInfo.html';

            // console.log(source_city);
            // console.log(destination_city);
            // console.log(source_countryCode);
            // console.log(destination_countryCode);

            sessionStorage.setItem('source_city', JSON.stringify(source_city));
            sessionStorage.setItem('destination_city', JSON.stringify(destination_city));
            
            return fetch("https://restcountries.eu/rest/v2/alpha/"+source_countryCode)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    var source_country = data.name
                    var source_timezone = data.timezones[0];

                    return fetch("https://restcountries.eu/rest/v2/alpha/"+destination_countryCode)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            var destination_country = data.name;
                            var destination_timezone = data.timezones[0];

                            // console.log(source_country);
                            // console.log(destination_country);

                            // console.log(source_timezone);
                            // console.log(destination_timezone);


                        
                            sessionStorage.setItem('source_country', JSON.stringify(source_country));
                            sessionStorage.setItem('destination_country', JSON.stringify(destination_country));
                            
                            sessionStorage.setItem('source_timezone', JSON.stringify(source_timezone));
                            sessionStorage.setItem('destination_time', JSON.stringify(destination_timezone));

                            window.location.href = 'tripInfo.html';
                        })
               })
        })

        .catch(err => {
            console.log(err);
        });

      
}