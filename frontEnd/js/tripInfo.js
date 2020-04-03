
// Create a "close" button and append it to each list item
var listItems = document.getElementsByTagName("LI");
var i;
for (i = 0; i < listItems.length; i++) 
{
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    listItems[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) 
{
    close[i].onclick = function() 
    {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) 
{
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

/////////////////////////
//  onClick Functions  //
/////////////////////////

function showBigList(listID)
{
    darkenBackground();
    var listToShow = listID + "-big";
    var bigList = document.getElementById(listToShow);
    bigList.hidden = false;
}

function hideBigList(listID)
{
    var list = document.getElementById(listID);
    list.hidden = true;
}


// Create a new list item when clicking on the "Add" button
function newElement(listID) 
{
    // Create new element with the input value
    var li = document.createElement("li");
    var inputValue = document.getElementById("inputVal").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    // Make sure value isn't empty
    if (inputValue === '') 
    {
        alert("You must write something!");
    }
    else 
    {
        document.getElementById(listID).appendChild(li);
    }

    // Set it back to empty
    document.getElementById("inputVal").value = "";
    
    // Add the close button
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    
    close = document.getElementsByClassName("close");
    for (i = 0; i < close.length; i++) 
    {
        close[i].onclick = function() 
        {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

// Darken the background when opening up a card
function darkenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0.5;
}

function lightenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0;
}