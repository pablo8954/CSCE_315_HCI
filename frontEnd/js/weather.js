let geocodingApiKey = "9d31dce92a954246acd5db35beb075c0";
let openWeatherApiKey = "7ae2248e4f83f4cf50f02e00c205a33a"

var cityName;
var countryName

function trySettingWeatherData(theCity, theCountry)
{
    console.log ("trying to get location for " + theCity)
    cityName = theCity;
    countryName = theCountry
    let requestString = "https://api.opencagedata.com/geocode/v1/json?q=" + theCity + "&key=" + geocodingApiKey;
    fetch(requestString)
    .then(response => {
        return response.json();
    })
    .then(data => {
        // send the results to grab weather data
        grabWeatherData(data.results[0].geometry.lat, data.results[0].geometry.lng)
    })
    .catch(err => {
        console.log(err);
        checkIfEverythingDone();
    });
}

function grabWeatherData(lat, long)
{
    let requestString = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + openWeatherApiKey;
    fetch(requestString)
    .then(response => {
        return response.json();
    })
    .then(data=> {
        updateWeatherData(data);
    })
    .catch(err => {
        console.log(err);
        checkIfEverythingDone();
    });
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var temps = []

function updateWeatherData(weatherData)
{
    let places = document.getElementsByClassName("place");
    for (var i = 0; i < places.length; ++i)
    {
        places[i].innerHTML = cityName + ", " + countryName;
    }
    for (var i = 1; i <= 5; ++i)
    {
        document.getElementById("temp-" + i).innerHTML = parseInt(weatherData.daily[i - 1].temp.day - 273) + "&deg;";
        temps.push({celcius: (parseInt(weatherData.daily[i - 1].temp.day - 273)), fahrenheit: parseInt((weatherData.daily[i - 1].temp.day - 273) * 9.0/5.0 + 32)})
        document.getElementById("weather-cond-" + i).innerHTML = weatherData.daily[i - 1].weather[0].main;
        var theDate = new Date(weatherData.daily[i - 1].dt * 1000)
        console.log(theDate)
        document.getElementById("date-" + i).innerHTML = months[theDate.getMonth()] + " " + theDate.getDate();
    }
    checkIfEverythingDone();
}

document.getElementById("weather-unit-switch").addEventListener('change', weatherUnitChanged)
function weatherUnitChanged()
{
    for (var i = 1; i <= 5; ++i)
    {
        if (document.getElementById("weather-unit-switch").checked)
            // F to C
            document.getElementById("temp-" + i).innerHTML =  temps[i - 1].celcius + "&deg;"
        else
            // C to F
            document.getElementById("temp-" + i).innerHTML =  temps[i - 1].fahrenheit + "&deg;"
     
    }
}