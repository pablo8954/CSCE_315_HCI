var listOfLists = {};

var listColors = ["#993333", "#008dc8", "#0f9d58", "#e18300"];

var phraseList= new Array();
var listOfPhrases = {'phrases' : phraseList};

//       TEMPORARY CODE
// ****************************

phraseList.push({name: "Where is the restroom?"});
phraseList.push({name: "Where is my hotel?"});
phraseList.push({name: "Where is the airport?"});
phraseList.push({name: "Where is a resturaunt?"});
phraseList.push({name: "Hi, how are you?"});
phraseList.push({name: "I dont speak your language?"});
phraseList.push({name: "How much does this cost?"});
phraseList.push({name: "What time is it?"});


// Repopulates a given regular list by giving the name of the list
function repopulateListByName(listName)
{
    // empty list
    document.getElementById(listName + "-list").innerHTML = "";
    
    var listVals = listOfLists[listName];
    console.log(listVals)
    for (var i = 0; i < listVals.length; ++i)
    {
        // create element using item
        var li = document.createElement("li");
        li.classList.toggle("list-view-item");
        li.innerHTML = listVals[i].name;
        
        if (listVals[i].checked)
        {
            li.style.textDecoration = 'line-through';
        }
        
        // add element to toiletry list
        document.getElementById(listName + "-list").appendChild(li);
    }
}

// called to create a checkbox for the editable list (already checked is a boolean specifying if the checkbox is checked)
function createCheckbox(alreadyChecked)
{
    // Create the objects needed
    var checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'checkbox-label';
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // Set the default checked value
    if (alreadyChecked)
    checkbox.checked = alreadyChecked;
    var span = document.createElement('span');
    span.className = "checkbox-custom";
    
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(span);
    
    // Add the event listener for onchange
    checkbox.addEventListener('change', function(eve)
    {
        // the 2nd label because the 1st label is the checkboxLabel
        var theLabel = eve.target.parentElement.parentElement.getElementsByTagName('label')[1];
        if (eve.target.checked)
        {
            theLabel.style.textDecoration = 'line-through';
        }
        else
        {
            theLabel.style.textDecoration = 'none';
        }
    });
    
    return checkboxLabel;
}

// function to create a single item of the editable list
function createEditableListItem(itemVal)
{
    // create element using item
    var li = document.createElement('li');
    li.classList.toggle('editable-list-item');
    
    // create check through option here
    var checkbox = createCheckbox(itemVal.checked);
    
    // create the label
    var value = document.createElement("label");
    value.innerText = itemVal.name;
    value.className = 'editable-list-label';
    value.contentEditable = true;
    if (itemVal.checked)
    {
        value.style.textDecoration = 'line-through';
    }
    
    // Add focus listeners to show focus mode for the list item
    value.addEventListener("focus", function(eve)
    {
        eve.target.parentElement.classList.toggle('bordered-editable-list-item');
    });
    value.addEventListener("focusout", function(eve)
    {
        eve.target.parentElement.classList.toggle('bordered-editable-list-item');
    });
    
    // add delete option here
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.className = "delete-list-button";
    deleteButton.addEventListener('click', function(eve)
    {
        eve.target.parentElement.parentElement.removeChild(eve.target.parentElement);
    });
    
    // Add all subviews to the list item
    li.append(checkbox);
    li.append(value);
    li.appendChild(deleteButton);
    
    return li;
}

// Given name of the editable center list, repopulate it
function repopulateCenterListByName(listName)
{
    // empty list
    document.getElementById("editable-list").innerHTML = "";
    
    var listVals = listOfLists[listName];
    
    for (var i = 0; i < listVals.length; ++i)
    {
        var li = createEditableListItem(listVals[i]);
        
        // add element to toiletry list
        document.getElementById("editable-list").appendChild(li);
    }
}

// Called to add a new element to list
function addNewElement()
{
    var text = document.getElementById('add-input').value;
    if (text == '')
    {
        alert('Nothing to add!');
        return;
    }
    var itemVal = {name: text, checked: false};
    var newLi;
    if(currentTable == "phrases"){
        newLi = createEditablePhraseItem(itemVal);
    }
    else{ 
        newLi = createEditableListItem(itemVal);
    }
    
    document.getElementById('editable-list').appendChild(newLi);
    document.getElementById('add-input').value = '';
}

// Populates all the list using the keys from listOfLists
function repopulateAllLists()
{
    var keyList = Object.keys(listOfLists);
    for (var i = 0; i < keyList.length; ++i)
    {
        repopulateListByName(keyList[i]);
    }
}

// Stores the current table name as a string to be used by two functions
var currentTable;
function showEditableView (eve)
{
    darkenBackground();
    
    var listName = eve.target.id;
    currentTable = listName;
    // get the editable view to be showed
    var editableView = document.getElementById('editable-list-view');
    var editableList = document.getElementById('editable-list');
    // get the right list from tableName
    var listData = listOfLists[listName];
    // get the listView
    var listView = document.getElementById(listName);
    
    // Set appropriate colors and values
    var bgcolor = getComputedStyle(listView, null).getPropertyValue("background-color");
    var color = getComputedStyle(listView, null).getPropertyValue("color");
    var heading = listView.getElementsByTagName("h2")[0].innerHTML;
    editableView.getElementsByTagName("h2")[0].innerHTML = heading;
    editableView.style.backgroundColor = bgcolor;
    editableView.style.color = color;
    
    // set list items for editable view
    repopulateCenterListByName(listName);
    // show the editable view
    editableView.style.display = 'flex';
    
}

// Closes the editable list view in the center
function closeEditableView ()
{
    // get the updated list from the editable view
    var editableView = document.getElementById('editable-list-view');
    var editableList = document.getElementById('editable-list');
    // get a list from the editable view
    var elements = editableList.getElementsByTagName('li');
    var newList = new Array();
    for (var i = 0; i < elements.length; ++i)
    {
        var labelVals = elements[i].getElementsByTagName('label');
        var newElement;
        if (currentTable == "phrases") newElement = { name: labelVals[0].innerText};
        else newElement = { name: labelVals[1].innerText, checked: (labelVals[1].style.textDecoration == 'line-through')};
        newList.push(newElement);
    }
    if (currentTable == "phrases"){
        listOfPhrases[currentTable] = newList;
        populatePhraseList();
    }
    else {
        
        listOfLists[currentTable] = newList;
        
        // repopulate the appropriate table
        repopulateListByName(currentTable);
        document.getElementById(currentTable).getElementsByTagName("h2")[0].innerHTML = editableView.getElementsByTagName("h2")[0].innerHTML;
    }
    
    
    // repopulate the appropriate table
    
    // reset the heading as neede
    
    // close the editable view
    editableView.style.display = 'none';
    
    lightenBackground();
}



// Darken the background when opening up a card
function darkenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0.8;
    darkener.hidden = false;
    this.document.getElementById('darkener').classList.toggle('unclickable');
}

// lighten the background again
function lightenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0;
    darkener.hidden = true;
    this.document.getElementById('darkener').classList.toggle('unclickable');
}

function createListView(listName, bgcolor)
{
    var viewDiv = document.createElement('div');
    viewDiv.className = "list-view";
    viewDiv.id = listName.toLowerCase();
    viewDiv.addEventListener("click", showEditableView);
    var heading = document.createElement('h2');
    heading.className = "list-heading";
    heading.innerHTML = listName;
    var list = document.createElement('ul');
    list.id = listName.toLowerCase() + "-list";
    
    viewDiv.appendChild(heading);
    viewDiv.appendChild(list);
    viewDiv.style.backgroundColor = bgcolor;
    document.getElementById("list-container").appendChild(viewDiv); 
}

// Load the data from the database
function loadData()
{
    // ***************************
    // **       BIG TODO:       **
    // ** GET ALL THE DATA HERE **
    // ***************************
    
    // check if signed in and get the data from there
    
    // otherwise get the default data
    
    // send a request for the data
    // set the data to appropriate lists
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var res = JSON.parse(xhttp.response);
            console.log(res);
            var keyList = Object.keys(res);
            
            for (var i = 0; i < keyList.length; ++i)
            {
                createListView(keyList[i], listColors[i % listColors.length]);
                listOfLists[keyList[i].toLowerCase()] = res[keyList[i]];
            }
            
            // Populate all the lists with the data
            repopulateAllLists();
        }
    };
    xhttp.open("GET", "default-lists", true);
    xhttp.send();
    
}

function currencyExchangeRate(source_currency_code, destination_currency_code)
{
    fetch("https://fixer-fixer-currency-v1.p.rapidapi.com/convert?from="+ source_currency_code + "&to=" + destination_currency_code + "&amount=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "fixer-fixer-currency-v1.p.rapidapi.com",
            "x-rapidapi-key": "74af4218f0msh230f6d471685153p1b4bc6jsn758dfbb4cccb"
        }
    })
    .then(response => {
        return response.json();
    })
    .then (data => {
        var exchangeRate = JSON.stringify(data.result);
        
        //print currency rate to tripInfo
        document.getElementById('exchange-rate-label').innerHTML = "1 " +  
            JSON.stringify(source_currency_code).replace(/\"/g, "") + " = " + exchangeRate + " "+ 
            JSON.stringify(destination_currency_code).replace(/\"/g, "");
    })
    .catch(err => {
        console.log(err);
    });

}

function tripTimeDetails(data)
{
    //unpack & place date difference on page
    var day_diff = this.sessionStorage.getItem('day_diff');

    if (day_diff == 1){ var day_text = "day"}
    else {var day_text = "days"}
    
    document.getElementById('trip-length').innerHTML = "Trip Length: " + day_diff.bold() + " " + day_text.bold();

    //get departure time
    var depart = JSON.stringify(data[0].departure.scheduledTimeLocal).replace(/\"/g, "");
    depart_date_time = depart.split(" ");

    var depart_date = depart_date_time[0];
    var depart_time = depart_date_time[1];

    //get arrival time

}

function loadFlightData()
{
    //unpack json
    var data = this.sessionStorage.getItem('travel_json');
    var flight_data = JSON.parse(data);
    
    tripTimeDetails(flight_data);

    var source_city = JSON.stringify(flight_data[0].departure.airport.municipalityName).replace(/\"/g, "");
    var destination_city = JSON.stringify(flight_data[0].arrival.airport.municipalityName).replace(/\"/g, "");

    var source_countryCode = flight_data[0].departure.airport.countryCode;
    var destination_countryCode = flight_data[0].arrival.airport.countryCode;

    var restCountryAPI = 'https://restcountries.eu/rest/v2/alpha/';

    //grab source country metadata
    fetch(restCountryAPI + source_countryCode)
    .then(response => {
        return response.json();
    })
    .then(data => {
        
        var source_country = JSON.stringify(data.name).replace(/\"/g, "");
        var source_currency = JSON.stringify(data.currencies[0].code).replace(/\"/g, "");
        
        //grab destination country metadata
        return fetch(restCountryAPI + destination_countryCode)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var destination_country = JSON.stringify(data.name).replace(/\"/g, "");
            var destination_currency = JSON.stringify(data.currencies[0].code).replace(/\"/g, "");


            currencyExchangeRate(source_currency,destination_currency);

            //populate elements for user
            document.getElementById('source').innerHTML = source_city + ', ' + source_country;
            document.getElementById('destination').innerHTML = destination_city + ', ' + destination_country;
        });
    });


}

// Called when window is loaded
window.onload = function()
{
    loadData();
    populatePhraseList();
    // hide the center view
    this.document.getElementById('editable-list-view').style.display = 'none';
    this.document.getElementById('phrases').addEventListener("click", showPhrasesEditableView);
    // Get the screen darkener ready
    this.document.getElementById('darkener').hidden = true;
    this.document.getElementById('darkener').addEventListener('click', this.closeEditableView);
    this.document.getElementById('darkener').classList.toggle('unclickable');
    // Set add button onclick event listener
    this.document.getElementById('add-button').addEventListener('click', this.addNewElement);
    // add event listener for enter and press the add button
    document.getElementById("add-input").addEventListener("keyup", function(event) 
    {
        event.preventDefault();
        if (event.keyCode === 13) // enter pressed
        {
            document.getElementById("add-button").click();
        }
    });
    // add event listener for editable view close button
    this.document.getElementById('close-editable-button').addEventListener('click', this.closeEditableView);

    //grab flight data & use data to get other travel information
    loadFlightData();

    updateLanguage("Egypt"); //destination
    updateTimeZone( "Mexico", "Egypt"); // source, destination
}

function populatePhraseList() {
    document.getElementById("phrases-list").innerHTML = "";
    
    var listVals = listOfPhrases["phrases"];
    
    for (var i = 0; i < listVals.length; ++i)
    {
        // create element using item
        var li = document.createElement("li");
        li.classList.toggle("list-view-item");
        li.innerHTML = listVals[i].name;
        
        
        // add element to toiletry list
        document.getElementById("phrases-list").appendChild(li);
    }
}

function showPhrasesEditableView(eve) {
    darkenBackground();
    console.log(listOfPhrases['phrases']);
    var listName = eve.target.id;
    currentTable = listName;
    // get the editable view to be showed
    var editableView = document.getElementById('editable-list-view');
    var editableList = document.getElementById('editable-list');
    // get the right list from tableName
    var listData = listOfPhrases[listName];
    // get the listView
    var listView = document.getElementById(listName);
    
    // Set appropriate colors and values
    var bgcolor = getComputedStyle(listView, null).getPropertyValue("background-color");
    var color = getComputedStyle(listView, null).getPropertyValue("color");
    var heading = listView.getElementsByTagName("h2")[0].innerHTML;
    editableView.getElementsByTagName("h2")[0].innerHTML = heading;
    editableView.style.backgroundColor = bgcolor;
    editableView.style.color = color;
    
    // set list items for editable view
    repopulateCenterPhrasesByName(listName);
    
    
    // set addNewElement action
    
    editableView.style.display = 'flex';
    
}

function repopulateCenterPhrasesByName(listName)
{
    // empty list
    document.getElementById("editable-list").innerHTML = "";
    
    var listVals = listOfPhrases[listName];
    
    for (var i = 0; i < listVals.length; ++i)
    {
        var li = createEditablePhraseItem(listVals[i]);
        
        // add element to toiletry list
        document.getElementById("editable-list").appendChild(li);
    }
}

function createEditablePhraseItem(itemVal)
{
    // create element using item
    var li = document.createElement('li');
    li.classList.toggle('editable-list-item');
    
    
    // add the label
    var value = document.createElement("label");
    value.innerText = itemVal.name;
    value.className = 'editable-list-label';
    value.contentEditable = true;
    
    value.addEventListener("focus", function(eve)
    {
        eve.target.parentElement.classList.toggle('bordered-editable-list-item');
    });
    
    value.addEventListener("focusout", function(eve)
    {
        eve.target.parentElement.classList.toggle('bordered-editable-list-item');
    });
    
    // add delete option here
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    deleteButton.className = "delete-list-button";
    deleteButton.addEventListener('click', function(eve)
    {
        eve.target.parentElement.parentElement.removeChild(eve.target.parentElement);
        for( var i = 0; i < arr.length; i++){ if ( arr[i] === 5) { arr.splice(i, 1); }}
    });
    
    li.append(value);
    li.appendChild(deleteButton);
    
    return li;
}


function updateLanguage(name_of_country) {
    var request = new XMLHttpRequest();
    request.open('GET', "https://restcountries.eu/rest/v2/");
    request.send();
    request.onload = function() {
        var data = JSON.parse(this.response);
        //name-> === country name
        //language, name -> === language name of country
        var found = 0;
        var lang;
        data.forEach(country => {
            if(request.status >=200 && request.status < 400 && country.name == name_of_country) {
                lang = country.languages[0].name;
                found = 1;
            }
        });
        
        if(found == 1) {
            document.getElementById("p-language-output").innerHTML = "Primary Language: " + lang;
        }
        else {
            document.getElementById("p-language-output").innerHTML = "Could not find language for " + name_of_country;
        }
    }
}

function updateTimeZone(source_name_of_sCountry, dest_name_of_country) {
    var request = new XMLHttpRequest();
    request.open('GET', "https://restcountries.eu/rest/v2/");
    request.send();
    request.onload = function() {
        var data = JSON.parse(this.response);
        //name-> === country name
        //language, name -> === language name of country
        var sfound = 0;
        var stimezone;
        var dfound = 0;
        var dtimezone;
        data.forEach(country => {
            if(request.status >=200 && request.status < 400 && country.name == source_name_of_sCountry) {
                if(country.timezones.length == 1) {
                    stimezone = country.timezones[0];
                    sfound = 1;
                }
                //
                //Need to look for city too.. perhaps in next sprint?
                //
                else {
                    sfound = 2;
                    console.log("Error, multiple time zones detected(source country)... choosing first one");
                    stimezone = country.timezones[0];
                }
            }
            else if(request.status >=200 && request.status < 400 && country.name == dest_name_of_country) {
                if(country.timezones.length == 1) {
                    dtimezone = country.timezones[0];
                    dfound = 1;
                }
                //
                //Need to look for city too.. perhaps in next sprint?
                //
                else {
                    dfound = 2;
                    console.log("Error, multiple time zones detected(dest country)... choosing first one");
                    dtimezone = country.timezones[0];
                }
            }
        });
        
        if(sfound == 1) {
            console.log('Source Time zone = ' + stimezone);
            document.getElementById("source-time-zone").innerHTML = "Source Time Zone: " + stimezone;
        }
        else if (sfound == 2) {
            document.getElementById("source-time-zone").innerHTML = "Source Time Zone: " + stimezone;
        }
        else {
            document.getElementById("source-time-zone").innerHTML = "Could not find time zone for " + source_name_of_sCountry;
        }
        
        if(dfound == 1) {
            console.log('Source Time zone = ' + stimezone);
            document.getElementById("dest-time-zone").innerHTML = "Destination Time Zone: " + dtimezone;
        }
        else if (dfound == 2) {
            document.getElementById("dest-time-zone").innerHTML = "Destination Time Zone: " + dtimezone;
        }
        else {
            document.getElementById("dest-time-zone").innerHTML = "Could not find time zone for " + dest_name_of_sCountry;
        }
        
        // calculating lost/gained time
        if(dfound != 0 && sfound != 0) { 
            
            //getting source time zone into float
            var source_hours;
            
            stimezone = stimezone.substring(3);
            if(stimezone == "") {
                source_hours = 0;
            }
            else {
                var sOperator = stimezone.charAt(0);
                var shours = stimezone.charAt(1) + stimezone.charAt(2);
                var sminutes = stimezone.charAt(4) + stimezone.charAt(5);
                source_hours = parseInt(shours);
                var source_minutes = parseInt(sminutes);
                source_minutes = source_minutes / 60;
                source_hours = source_hours + source_minutes;
                if(sOperator == "-") source_hours = source_hours * -1;
            }
            
            //getting dest time zone into float
            dtimezone = dtimezone.substring(3);
            var dest_hours;
            if(dtimezone == "") {
                dest_hours = 0;
            }
            else {
                var dOperator = dtimezone.charAt(0);
                var dhours = dtimezone.charAt(1) + dtimezone.charAt(2);
                var dminutes = dtimezone.charAt(4) + dtimezone.charAt(5);
                dest_hours = parseInt(dhours);
                var dest_minutes = parseInt(dminutes);
                dest_minutes = dest_minutes / 60;
                dest_hours = dest_hours + dest_minutes;
                if(dOperator == "-") dest_hours = dest_hours * -1;
            }
            
            
            //calculating change in time zone
            var time_change = dest_hours - source_hours;
            console.log(time_change);
            if(time_change < 0) {
                time_change = time_change * - 1;
                document.getElementById("time-zone-change").innerHTML = "Time Zone Change: You will Lose " + time_change.toString() + " hours";
            }
            else if (time_change > 0){
                document.getElementById("time-zone-change").innerHTML = "Time Zone Change: You will Gain " + time_change.toString() + " hours";
            }
            else {
                document.getElementById("time-zone-change").innerHTML = "Time Zone Change: You will not change time zones";
            }
            
        }
    }
}
