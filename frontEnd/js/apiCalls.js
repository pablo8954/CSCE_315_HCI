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
  const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('userauthentication');
  client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
    db.collection('information').updateOne({owner_id: client.auth.user.id, email:profile.getEmail()}, {$set:{name: profile.getName(), image: profile.getImageUrl()}}, {upsert:true})
    ).then(() =>
    db.collection('information').find({owner_id: client.auth.user.id, email: profile.getEmail()}, { limit: 100}).asArray()
    ).then(docs => {
      console.log("Verifying existance of account")
      console.log("Found account", docs)
    }).catch(err => {
      console.error(err)
      return profile.getEmail();
    });
    
}
  
var tripbase = {};

function manualInput()
{
  var srcCity = document.getElementById("citySrcId");
  var srcState = document.getElementById("stateSrcId");
  var srcCountry = document.getElementById("countrySrcId");

  var desCity = document.getElementById("cityDesId");
  var desState = document.getElementById("stateDesId");
  var desCountry = document.getElementById("countryDesId");

  // console.log(srcCity.options[srcCity.selectedIndex].value);
  // console.log(srcState.options[srcState.selectedIndex].value);
  // console.log(srcCountry.options[srcCountry.selectedIndex].value);

  // console.log(desCity.options[desCity.selectedIndex].value);
  // console.log(desState.options[desState.selectedIndex].value);
  // console.log(desCountry.options[desCountry.selectedIndex].value);

   

}


function flightNumberParse()
{
    //take user input of dates and flight number
    var flight_num = document.getElementById("flight-number").value.replace(/\s/g, "");
    var departure_date = document.getElementById("start-date").value;
    var end_date = document.getElementById("return-date").value;
    //verify dates are valid    
    diff = Math.floor((Date.parse(end_date) - Date.parse(departure_date) )/ 86400000) + 1; //add 1 to account for day of departure
    sessionStorage.setItem('day_diff', JSON.stringify(diff)); 

    //error statement & abort function
    if (diff < 1){
      alert("Hmm, your dates inputs seem off. Please input a return date which is after the departure date.");
      return
    }

    // console.log(diff);
    tripbase["flight_number"] = flight_num
    tripbase["departure_date"] = departure_date
    tripbase["end_date"] = end_date
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

      var depart_time_local = data[0].departure.scheduledTimeLocal;

      var arrival_time_local = data[0].arrival.scheduledTimeLocal;

      if (source_city == undefined || destination_city == undefined || 
        source_countryCode == undefined || destination_countryCode == undefined || 
        depart_time_local == undefined || arrival_time_local == undefined)
      {
        alert("something went wrong with the flight number");
        return;
      }

      tripbase["source_city"] = source_city
      tripbase["source_countryCode"] = source_countryCode
      tripbase["destination_city"] = destination_city
      tripbase["destination_countryCode"] = destination_countryCode

      var xhr = new XMLHttpRequest();
      xhr.open("POST", '/newtripdata', true);
      //Send the proper header information along with the request
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
      }
    }

    console.log(JSON.stringify(tripbase))
    xhr.send(JSON.stringify(tripbase));
    // xhr.send(new Int8Array()); 
    // xhr.send(document);
    console.log(source_city);
    console.log(destination_city);
    console.log(source_countryCode);
    console.log(destination_countryCode);
    
    //store json for analysis in tripInfo.js
    sessionStorage.setItem('travel_json', JSON.stringify(data));
    window.location.href = 'tripInfo.html';
  })
  
  .catch(err => {
    console.log(err);
  });
}