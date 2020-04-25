
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

function hideStuff() {
    console.log("hiding stuff");
    document.getElementById("exchange-rate-label").style.display = 'none';
    document.getElementById("exchange-rate").style.display = 'none';
    document.getElementById("power-label").style.display = 'none';
    document.getElementById("power-adapter-label").style.display = 'none';
    document.getElementById("power-voltage-label").style.display = 'none';
    document.getElementById("power-frequency-label").style.display = 'none';
}