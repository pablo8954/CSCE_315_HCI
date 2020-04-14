
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

function change_text_size(val) {
	val = val - 50;
	var elements = document.getElementsByClassName('s-label');
	for(var i = 0; i < elements.length; i++) {
		var element = elements[i];
		element.style.fontSize = 30 + val + "px";
	}
	var elements2 = document.getElementsByClassName('place-label');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 30 + val + "px";
	}
	var elements2 = document.getElementsByClassName('nav-logo-label');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 30 + val + "px";
	}
	var elements2 = document.getElementsByClassName('small-label');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 30 + val + "px";
	}
	var elements2 = document.getElementsByClassName('big-label');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 30 + val + "px";
	}
	var elements2 = document.getElementsByClassName('button-change-info');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 20 + val + "px";
	}
	var elements2 = document.getElementsByClassName('list-heading');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 30 + val + "px";
	}
	//need to add one for list info
	var elements2 = document.getElementsByClassName('questions-container');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 10 + val + "px";
	}
	var elements2 = document.getElementsById('question-label');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 22 + val + "px";
	}
	var elements2 = document.getElementsById('button-type-1');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 22 + val + "px";
	}
	var elements2 = document.getElementsById('button-type-2');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 22 + val + "px";
	}
	var elements2 = document.getElementsById('heading');
	for(var i = 0; i < elements2.length; i++) {
		var element = elements2[i];
		element.style.fontSize = 105 + val + "px";
	}
}








