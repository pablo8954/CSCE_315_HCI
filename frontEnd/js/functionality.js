// Variables to keep track of
var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

// Get settings/variables
var darkMode = false;
darkMode = sessionStorage.getItem('dark-mode');
if (darkMode)
{
    darkMode = (darkMode == "true");
    if (darkMode)
    {
        // Set as opposite of what it is
        darkMode = false;
        document.getElementById('dark-mode-checkbox').checked = true;
        toggleTheme();
    }
}
else
{
    darkMode = false;
    document.getElementById('dark-mode-checkbox').checked = true;
    toggleTheme();
}

var textToSpeech = false;
textToSpeech = sessionStorage.getItem('text-to-speech')
if (textToSpeech)
{
    textToSpeech = (textToSpeech == "true");
    if (textToSpeech)
    {
        // Set as opposite of what it is
        textToSpeech = false;
        document.getElementById('text-to-speech-checkbox').checked = true;
        toggleTextToSpeech();
    }
}

var colorBlindness = false;

function oldTripsClicked()
{
    var sidebar = document.getElementById("sidebar");
    // If sidebar is open, collapse it
    if (! sidebar.classList.contains("collapsed"))
    {
        toggleSidebar();
        if (document.getElementById("old-trips-container").style.display == "flex")
        
            return;
        

        document.addEventListener(transEndEventName, showOldTrips);
        return;
    }


    showOldTrips();
}

function toggleTheme()
{
    darkMode = ! darkMode;
    sessionStorage.setItem('dark-mode', JSON.stringify(darkMode));
    var toCheck = sessionStorage.getItem('dark-mode');
    console.log('set to ' + darkMode);
    console.log(typeof darkMode);
    // ** To change **
    // main-body
    // logo heading
    // main-nav
    // big-label
    // small-label

    // Toggle all dark themed classes
    toggleDarkThemeOfClass("main-body", "dark");
    toggleDarkThemeOfClass("main-nav-link", "dark-main-nav");
    toggleDarkThemeOfClass("nav-logo-label", "dark-nav-logo-label");
    toggleDarkThemeOfClass("small-label", "dark-small-label");
    toggleDarkThemeOfClass("big-label", "dark-big-label");
}

function toggleDarkThemeOfClass(className, darkClassName)
{
    var toChange = document.getElementsByClassName(className);
    for (var i = 0; i < toChange.length; ++ i)
    {
        toChange[i].classList.toggle(darkClassName);
    }
}

function settingsClicked()
{
    var sidebar = document.getElementById("sidebar");
    // If sidebar is open, collapse it
    if (! sidebar.classList.contains("collapsed"))
    {
        toggleSidebar();

        if (document.getElementById("settings-container").style.display == "flex")
        
            return;
        

        document.addEventListener(transEndEventName, showSettings);
        return;
    }

    showSettings();



}

function showSettings()
{
    // Hide Old Trips and show Settings
    document.getElementById("settings-container").style.display = 'flex';
    document.getElementById("old-trips-container").style.display = 'none';

    // Open the sidebar again
    toggleSidebar();
    document.removeEventListener(transEndEventName, showSettings);
}

function showOldTrips()
{
    // Show Old Trips and hide Settings
    var oldTrips = JSON.parse(sessionStorage.getItem('old-trips'))
    console.log(oldTrips)
    document.getElementById("settings-container").style.display = 'none';
    document.getElementById("old-trips-container").style.display = 'flex';

    var numTrips = oldTrips.length;

    toggleSidebar();
    document.getElementsByClassName("old-trips-list")[0].innerHTML = ''

    for (var i = 0; i < numTrips; i++)
    {
        var viewDiv = document.createElement('li');
        var icon = document.createElement('i');
        icon.classList.toggle('fas');
        icon.classList.toggle('fa-plane');
        viewDiv.appendChild(icon);
        viewDiv.innerHTML = oldTrips[i].departure_city + " to " + oldTrips[i].arrival_city + ' <br>' + 'on ' + oldTrips[i].start_date;
        viewDiv.id = 'trip-' + (i);
        viewDiv.addEventListener("click", clickedOldTrip);
        document.getElementsByClassName("old-trips-list")[0].appendChild(viewDiv);

    }

    document.removeEventListener(transEndEventName, showOldTrips);
}

function clickedOldTrip(event)
{
    var tripNumber = parseInt(event.target.id.slice(-1))
    console.log('clicked on ' + tripNumber)
    var tripData = JSON.parse(sessionStorage.getItem('old-trips')) [tripNumber]
    console.log(tripData)
    let travelJsonData = 
    {
        0: {
            "departure": {
                "airport": {
                    "municipalityName": tripData.departure_city,
                    "countryCode": tripData.departure_countryCode
                },
                "scheduledTimeLocal": -1,
                "date": tripData.start_date
            },

            "arrival": {
                "airport": {
                    "municipalityName": tripData.arrival_city,
                    "countryCode": tripData.arrival_countryCode
                },
                "scheduledTimeLocal": -1
            },

            "returnDate": tripData.end_date,
            lists: tripData.lists,
            tripid: tripData.tripid        
        }
    }

    sessionStorage.setItem('travel_json', JSON.stringify(travelJsonData))
    window.location.href = "tripInfo.html"
    // location.reload()
}

function toggleSidebar()
{
    document.getElementById("sidebar").classList.toggle("collapsed");
}

// Google Sign out
function signout()
{
    window.location.href = '/';
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    myemail = ""

    sessionStorage.setItem('old-trips', "[]")

    // set image and username to default
    var name = document.getElementById('name-label')
    name.innerHTML = "";
    var image = document.getElementById('profile-image');
    image.src = "/frontEnd/img/temp/person.png";

    // replace buttons
    document.getElementById("google-signin-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";
}

var textSize = sessionStorage.getItem('text-size')
if (textSize)
    textSize = parseInt(textSize)    
else
    textSize = 100 // already set by default

var rangeslider = document.getElementById("sliderRange");
rangeslider.value = textSize
document.body.style.zoom = textSize + '%';
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;
rangeslider.style.background = 'linear-gradient(to right, #FFCE00 0%, #FFCE00 ' + (
    rangeslider.value - 50
) + '%, #fff ' + (
    rangeslider.value - 50
) + '%, white 100%)'

rangeslider.oninput = function ()
{
    this.style.background = 'linear-gradient(to right, #FFCE00 0%, #FFCE00 ' + (
        this.value - 50
    ) + '%, #fff ' + (
        this.value - 50
    ) + '%, white 100%)'

    output.innerHTML = this.value;
    var val = this.value;
    var numString = val.toString();
    var zoomLevel = numString + "%";
    document.body.style.zoom = zoomLevel;
    sessionStorage.setItem('text-size', numString)
}

function toggleTextToSpeech()
{
    textToSpeech = ! textToSpeech;
    if (textToSpeech)
    {
        turnOnSpeakSelectedText();
    }
    else
    {
        turnOffSpeakSelectedText();
    }

    sessionStorage.setItem('text-to-speech', JSON.stringify(textToSpeech));
}

function showLoadingScreen()
{
    document.getElementById("loader").classList.remove('loader-hidden')
    document.getElementById("loader").classList.add('loader-show')
    console.log(document.getElementById("loader").classList)
}

function hideLoadingScreen()
{
    document.getElementById("loader").classList.add('loader-hidden')
    document.getElementById("loader").classList.remove('loader-show')}

function popupFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

