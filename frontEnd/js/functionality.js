
// Variables to keep track of
var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';
var darkMode = false;
// window.onload = function() {
darkMode = sessionStorage.getItem('dark-mode');

console.log('dark mode found as ' + darkMode)
if (darkMode)
{
    // Set as opposite of what it is
    darkMode = (darkMode == "true");
    if (darkMode)
    {
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
// }


var colorBlindness = false;

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
    darkMode = !darkMode;
    sessionStorage.setItem('dark-mode', JSON.stringify(darkMode));
    var toCheck = sessionStorage.getItem('dark-mode');
    console.log ('set to ' + darkMode);
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
    for (var i = 0; i < toChange.length; ++i)
    {
        toChange[i].classList.toggle(darkClassName);
    }
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

