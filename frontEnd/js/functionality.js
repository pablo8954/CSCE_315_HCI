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

    // TODO: Here we will get the information about the saved trips
    oldTrips = new Array();
    showOldTrips(oldTrips); // do this inside the fetch result
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

    // TODO: Here we will get the information about the person/settings

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

function showOldTrips(oldTrips)
{
    // Show Old Trips and hide Settings

    document.getElementById("settings-container").style.display = 'none';
    document.getElementById("old-trips-container").style.display = 'flex';

    var numTrips = oldTrips.length;

    toggleSidebar();

    for (var i = 0; i < numTrips; i++)
    {
        var viewDiv = document.createElement('li');
        var icon = document.createElement('i');
        icon.classList.toggle('fas');
        icon.classList.toggle('fa-plane');
        viewDiv.appendChild(icon);
        viewDiv.innerText = oldTrips[i][0] + " to " + oldTrips[i][1] + " on " + oldTrips[i][2];
        document.getElementsByClassName("old-trips-list")[0].appendChild(viewDiv);
    }

    document.removeEventListener(transEndEventName, showOldTrips);
}

function toggleSidebar()
{
    document.getElementById("sidebar").classList.toggle("collapsed");
}

// Google Sign out
function signout()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();

    // set image and username to default
    var name = document.getElementById('name-label')
    name.innerHTML = "";
    var image = document.getElementById('profile-image');
    image.src = "/frontEnd/img/temp/person.png";

    // replace buttons
    document.getElementById("google-signin-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";
}

var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
output.innerHTML = rangeslider.value;

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
    var loader = document.getElementById("loader");
    loader.style.display = 'flex';
}

function hideLoadingScreen()
{
    var loader = document.getElementById("loader");
    loader.style.display = 'none';
}