var email = ""

function onSignIn(googleUser)
{
  var profile = googleUser.getBasicProfile();
  //replace image and names
  var name = document.getElementById('name-label')
  name.innerHTML = profile.getName();
  var image = document.getElementById('profile-image');
  image.src = profile.getImageUrl();
  email = profile.getEmail()
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
  function flightNumberParse(){
    
    showLoadingScreen()
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
        "x-rapidapi-key": "a5aeadcc4fmshc5ec51281dba8a2p1ae4a3jsnb29493dd2409"
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
      tripbase["departure_city"] = source_city
      tripbase["departure_countryCode"] = source_countryCode
      tripbase["arrival_city"] = destination_city
      tripbase["arrival_countryCode"] = destination_countryCode
      tripbase["start_date"] = departure_date
      tripbase["end_date"] = end_date
      tripbase["email"] = email
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
    
      // alert("PAUSE");
      
      //store json for analysis in tripInfo.js
      sessionStorage.setItem('travel_json', JSON.stringify(data));
      window.location.href = 'tripInfo.html';
  })
  
  .catch(err => {
    console.log(err);
  });
}