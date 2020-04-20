let geocodingApiKey = "9d31dce92a954246acd5db35beb075c0";
let openWeatherApiKey = "7ae2248e4f83f4cf50f02e00c205a33a"

var cityName;

function trySettingWeatherData(theCity)
{
    console.log ("trying to get location for " + theCity)
    cityName = theCity;
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
        ++everythingReadyCounter;
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
        ++everythingReadyCounter;
    });
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateWeatherData(weatherData)
{
    let places = document.getElementsByClassName("place");
    for (var i = 0; i < places.length; ++i)
    {
        places[i].innerHTML = cityName;
    }
    for (var i = 1; i <= 5; ++i)
    {
        document.getElementById("temp-" + i).innerHTML = parseInt(weatherData.daily[i - 1].temp.day - 273) + "&deg;";
        document.getElementById("weather-cond-" + i).innerHTML = weatherData.daily[i - 1].weather[0].main;
        var theDate = new Date(weatherData.daily[i - 1].dt * 1000)
        console.log(theDate)
        document.getElementById("date-" + i).innerHTML = months[theDate.getMonth()] + " " + theDate.getDate();
    }
    ++everythingReadyCounter;
}