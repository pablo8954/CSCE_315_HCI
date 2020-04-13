
var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

function oldTripsClicked()
{
    var sidebar = document.getElementById("sidebar");
    // If sidebar is open, collapse it
    if (!sidebar.classList.contains("collapsed"))
    {
        toggleSidebar();
        if (document.getElementById("old-trips-container").style.display == "flex")
        return;

        document.addEventListener(transEndEventName , showOldTrips);
        return;
    }
    
    showOldTrips();
    
    // TODO: Here we will get the information about the saved trips
}

function toggleTheme()
{
    // Toggle all light themed classes

    // Toggle all dark themed classes
}

function settingsClicked()
{
    var sidebar = document.getElementById("sidebar");
    // If sidebar is open, collapse it
    if (!sidebar.classList.contains("collapsed"))
    {
        toggleSidebar();

        if (document.getElementById("settings-container").style.display == "flex")
        return;
        
        document.addEventListener(transEndEventName , showSettings);
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

function showOldTrips()
{
    // Show Old Trips and hide Settings
    document.getElementById("settings-container").style.display = 'none';
    document.getElementById("old-trips-container").style.display = 'flex';

    // Open the sidebar again
    toggleSidebar();
    document.removeEventListener(transEndEventName, showOldTrips);
}

function toggleSidebar()
{
    document.getElementById("sidebar").classList.toggle("collapsed");
}

// Google Sign out
function signout(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();

    //set image and username to default
    var name = document.getElementById('name-label')
    name.innerHTML = "";
    var image = document.getElementById('profile-image');
    image.src = "/frontEnd/img/temp/person.png";

    //replace buttons
    document.getElementById("google-signin-button").style.display="block";
    document.getElementById("logout-button").style.display="none";
}

