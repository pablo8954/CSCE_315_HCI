function showManualInfoOptions()
{
    document.getElementById("flight-number-container").style.display = "none"
    document.getElementById("next-button").style.display = "none"

    document.getElementById("manual-info-container").style.display = "flex"
    document.getElementById("next-button-manual").style.display = "flex"
    document.getElementById("back-button").style.display = "flex"

    document.getElementById("flight-number-label").innerHTML = "Enter your source and destination details"
}

function showFlightInputOptions()
{
    document.getElementById("flight-number-container").style.display = "flex"
    document.getElementById("next-button").style.display = "flex"

    document.getElementById("manual-info-container").style.display = "none"
    document.getElementById("next-button-manual").style.display = "none"
    document.getElementById("back-button").style.display = "none"

    document.getElementById("flight-number-label").innerHTML = "What is your flight number?"
}

document.getElementById("manual-info-container").style.display = "none"
document.getElementById("next-button-manual").style.display = "none"
document.getElementById("back-button").style.display = "none"
