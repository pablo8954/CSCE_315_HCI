
// Darken the background when opening up a card
function darkenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0.8;
    darkener.hidden = false;
    darkener.classList.toggle('unclickable');
}

// lighten the background again
function lightenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0;
    darkener.hidden = true;
    darkener.classList.toggle('unclickable');
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