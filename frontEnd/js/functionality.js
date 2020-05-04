// Variables to keep track of
var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

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
    if (myemail == "")
    {
        alert("You need to sign in to view your old trips")
        return
    }

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

    verifyDates(tripData.start_date, tripData.end_date)

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

if (isMobile)
{
    document.body.style.zoom = "150%"
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

