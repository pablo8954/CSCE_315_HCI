var listOfLists = {};
var languageChoice;
var listColors = ["#993333", "#008dc8", "#0f9d58", "#e18300"];

var langCode;

var phraseList= new Array();
var listOfPhrases = {'phrases' : phraseList};

var translateList = new Array();
var listOfTranslated = {'translated': translateList};

var destination_language_code = "";

//       TEMPORARY CODE
// ****************************

phraseList.push({name: "Where is the restroom?"});
phraseList.push({name: "Where is my hotel?"});
phraseList.push({name: "Where is a resturaunt?"});
phraseList.push({name: "Hi, how are you?"});
phraseList.push({name: "I don't speak your language."});
phraseList.push({name: "How much does this cost?"});
phraseList.push({name: "What time is it?"});


// Repopulates a given regular list by giving the name of the list
function repopulateListByName(listName)
{
    // empty list
    document.getElementById(listName + "-list").innerHTML = "";
    
    var listVals = listOfLists[listName];
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
        console.log('created var ' + i + ' for ' + listName)
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

var newTripNumber = 0

function generateNewListIdName()
{
    var initialName = "list" + Object.keys(listOfLists).length
    var keyList = Object.keys(listOfLists)    
    var newNum = parseInt((keyList[keyList.length - 1]).slice(-1)) + 1
    initialName = "list" + newNum

    return initialName
}

function createNewList()
{
    var newListName = "New List"
    var niceName = generateNewListIdName()
    listOfLists[niceName] = {}
    // create the list view
    createListView(newListName, niceName, listColors[(Object.keys(listOfLists).length - 1) % listColors.length]) 
    
    // Show editable view with the new list
    darkenBackground()
    // set the current table id
    currentTable = niceName;
    // get the editable view to be showed
    var editableView = document.getElementById('editable-list-view');
    var editableList = document.getElementById('editable-list');
    var listView = document.getElementById(niceName)
    
    repopulateCenterListByName(niceName);
    
    
    // Set appropriate colors and values
    var bgcolor = getComputedStyle(listView, null).getPropertyValue("background-color");
    var color = getComputedStyle(listView, null).getPropertyValue("color");
    listView.getElementsByTagName("h2")[0].innerHTML = "New List"
    editableView.getElementsByTagName("h2")[0].innerHTML = "New List";
    editableView.style.backgroundColor = bgcolor;
    editableView.style.color = color;
    
    editableView.style.display = 'flex';
}

function deleteList()
{
    delete listOfLists[currentTable]
    document.getElementById(currentTable).parentElement.style.display = 'none'
    
    var editableView = document.getElementById('editable-list-view');
    editableView.style.display = 'none'
    lightenBackground()
}


// Closes the editable list view in the center
function closeEditableView ()
{
    console.log("Current Tanle = " + currentTable);
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
        if (currentTable == "phrases" || currentTable == "translate") newElement = { name: labelVals[0].innerText};
        else newElement = { name: labelVals[1].innerText, checked: (labelVals[1].style.textDecoration == 'line-through')};
        newList.push(newElement);
    }
    if (currentTable == "phrases" || currentTable == "translate"){
        listOfPhrases[currentTable] = newList;
        populatePhraseList();
        
    document.getElementById("delete-list-button").style.display = 'block';
    }
    else {
        
        console.log(currentTable)
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

function createListView(listName, listIDName, bgcolor)
{
    console.log('list view with ' + listName + ', ' + listIDName)
    var viewDiv = document.createElement('div');
    var viewDivForList = document.createElement('div');
    viewDiv.className = "list-view";
    
    viewDivForList = document.createElement('div');
    viewDivForList.addEventListener("click", showEditableView);
    
    viewDivForList.id = listIDName
    
    viewDivForList.classList.toggle('view-div-list');
    
    // Add edit button
    var editButton = document.createElement('i');
    editButton.classList.add("far", "fa-edit", "list-edit-button")
    // Add heading
    var heading = document.createElement('h2');
    heading.className = "list-heading";
    heading.innerHTML = listName;
    // Add list
    var list = document.createElement('ul');
    list.id = listIDName + "-list";
    // Add hover message
    var hoverMessage = document.createElement('p');
    hoverMessage.classList.add("hover-message");    
    hoverMessage.innerHTML = "<i class=\"fas fa-hand-pointer\" style=\"color:white; font-size: 32px;\"></i><br>Click to Edit";
    
    viewDivForList.appendChild(heading);
    viewDivForList.appendChild(list);
    viewDivForList.appendChild(editButton);
    viewDiv.appendChild(viewDivForList);
    viewDiv.appendChild(hoverMessage);
    
    viewDivForList.style.backgroundColor = bgcolor;
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
    let data = JSON.parse(sessionStorage.getItem('travel_json'))
    if (data[0].lists)
    {
        for (var i = 0; i < data[0].lists.length; ++i)
        {
            createListView(data[0].lists[i].name, "list" + i, listColors[i % listColors.length]);
            listOfLists["list" + i] = data[0].lists[i].items
        }

        console.log(listOfLists)
        
        // Populate all the lists with the data
        repopulateAllLists();    
        checkIfEverythingDone();

        return
    }
    // otherwise get the default data
    
    // send a request for the data
    // set the data to appropriate lists
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var res = JSON.parse(xhttp.response);
            
            for (var i = 0; i < res.length; ++i)
            {
                createListView(res[i].name, "list" + i, listColors[i % listColors.length]);
                listOfLists["list" + i] = res[i].items
            }
            
            // Populate all the lists with the data
            repopulateAllLists();
            
            checkIfEverythingDone();
        }
    };
    var numDays = this.sessionStorage.getItem('day_diff');
    xhttp.open("GET", "default-lists", true);
    // here we need to send this to the backend to get default lists for different number of days
    xhttp.setRequestHeader("numdays", numDays);
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
    checkIfEverythingDone();
})
.catch(err => {
    console.log(err);
    checkIfEverythingDone();
});

}

//manual entry for time 
function tripTimeDetails_noTime(travel_data)
{
    var depart_date = JSON.stringify(travel_data[0].departure.date).replace(/\"/g, "");
    var return_date = JSON.stringify(travel_data[0].returnDate).replace(/\"/g, "");

    var depart_data_array = depart_date.split("-");
    var depart_date_phrase = depart_data_array[1]+ "/" + depart_data_array[2] + "/" + depart_data_array[0];

    var return_data_array = return_date.split("-");
    var return_date_phrase = return_data_array[1]+ "/" + return_data_array[2] + "/" + return_data_array[0];

    document.getElementById("departure-time").innerHTML = "You are leaving on " + depart_date_phrase.bold();
    document.getElementById("arrival-time").innerHTML = "You will be returning home on " + return_date_phrase.bold();

    document.getElementById("time-zone").style.display = 'none';
    document.getElementById("source-time-zone").style.display = 'none';
    document.getElementById("dest-time-zone").style.display = 'none';
    document.getElementById("time-zone-change").style.display = 'none';
}


function tripTimeDetails(data)
{
    //unpack & place date difference on page
    var day_diff = this.sessionStorage.getItem('day_diff');
    console.log("DAY DIFF");
    console.log(day_diff);
    //get number of days for travel
    if (day_diff == 1) {var day_text = "day"}
    else {var day_text = "days"}
    document.getElementById('trip-length').innerHTML = "Trip Length: " + day_diff.bold() + " " + day_text.bold();
    //get departure date 
    var depart = JSON.stringify(data[0].departure.scheduledTimeLocal).replace(/\"/g, "");
    //if the input was done manually, only return the dates the user is leaving and returning
    
    if (depart == -1)
    {
        tripTimeDetails_noTime(data);
        return
    }

    depart_date_time = depart.split(" ");
    var depart_date = depart_date_time[0];
    var depart_data_array = depart_date.split("-");
    var depart_date_phrase = depart_data_array[1]+ "/" + depart_data_array[2] + "/" + depart_data_array[0];
    console.log(depart_date_phrase);
    //get departure time - time stored as 24:00-5:00 (military time-UTC)
    var depart_time = depart_date_time[1];
    
    
    depart_time = depart_time.split("-"); 



    var depart_time = depart_time[0];
    var depart_hour_array = depart_time.split(":");
    var AM_PM = "";
    //adjust time to standard form instead of military
    if (depart_hour_array[0] >= 12)
    {
        console.log(depart_hour_array[0]);
        AM_PM = "pm";
        if (depart_hour_array[0] > 12)
        {
            depart_hour_array[0] = depart_hour_array[0] - 12;
        }
        depart_time = depart_hour_array[0] + ":" + depart_hour_array[1] + " " + AM_PM;
    }
    else {
        AM_PM = "am";
        if (depart_hour_array[0] == 0)
        {
            depart_hour_array[0] = depart_hour_array[0] + 12;
        }
        depart_time = depart_hour_array[0] + ":" + depart_hour_array[1] + " " + AM_PM;
    }
    document.getElementById("departure-time").innerHTML = "You are leaving on " + depart_date_phrase.bold() + " at " + depart_time.bold() + "."
    //get arrival time
    var arrival = JSON.stringify(data[0].arrival.scheduledTimeLocal).replace(/\"/g, "");
    arrival_date_time = arrival.split(" ");
    var arrival_date = arrival_date_time[0];

    var arrival_data_array = arrival_date.split("-"); 
    var arrival_date_phrase = arrival_data_array[1]+ "/" + arrival_data_array[2] + "/" + arrival_data_array[0];
    //get departure time - time stored as 24:00-5:00 (military time-UTC)
    var arrival_time = arrival_date_time[1];
    arrival_time = arrival_time.split("-");

 
    //Update Time zones Block
    var dest_dayTime = arrival_date_time[1];
    var source_dayTime = depart_date_time[1];

    var dest_time = "UTC" + dest_dayTime.slice(5);
    var source_time = "UTC" + source_dayTime.slice(5);

    console.log("Dest Time Zone " + dest_time);
    console.log("Source Time Zone " + source_time);

    updateTimeZone(source_time,dest_time);






    var arrival_time = arrival_time[0];
    var arrival_hour_array = arrival_time.split(":");
    var AM_PM = "";
    //adjust time to standard form instead of military
    if (arrival_hour_array[0] >= 12)
    {
        AM_PM = "pm";
        if (arrival_hour_array[0] > 12)
        {
            arrival_hour_array[0] = arrival_hour_array[0]-12;
        }
        arrival_time = arrival_hour_array[0] + ":" + arrival_hour_array[1] + " " + AM_PM;
    }
    else {
        AM_PM = "am";
        if (arrival_hour_array[0] == 0)
        {
            arrival_hour_array[0] = arrival_hour_array[0] + 12;
        }
        arrival_time = arrival_hour_array[0] + ":" + arrival_hour_array[1] + " " + AM_PM;
    }
    document.getElementById("arrival-time").innerHTML = "You will arrive on " + arrival_date_phrase.bold() + " at " + arrival_time.bold() + " (Destination Local)."
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

    if (source_countryCode == destination_countryCode)
    {
        hideStuff();
    }

    var restCountryAPI = 'https://restcountries.eu/rest/v2/alpha/';
    
    //grab source country metadata
    fetch(restCountryAPI + source_countryCode)
    .then(response => {
        return response.json();
    })
    .then(data => {
        
        var source_country = JSON.stringify(data.name).replace(/\"/g, "");
        var source_currency = JSON.stringify(data.currencies[0].code).replace(/\"/g, "");
        checkIfEverythingDone();
        
        //grab destination country metadata
        return fetch(restCountryAPI + destination_countryCode)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var destination_country = JSON.stringify(data.name).replace(/\"/g, "");
            var destination_country_native = JSON.stringify(data.nativeName).replace(/\"/g, "");
            var countrynames = {}
            countrynames["destination_country"] = destination_country
            countrynames["destination_country_native"] = destination_country_native
            var xhr = new XMLHttpRequest();
            xhr.open("GET", 'outletdata', true);
            xhr.setRequestHeader("country", destination_country)

            //don't send if native name if not a valid bytestring
            try{
                xhr.setRequestHeader("country_alt",destination_country_native);
            }
            catch{
                xhr.setRequestHeader("country_alt",undefined);
                console.log("CAUGHT");
            }


            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    outletinfo = JSON.parse(xhr.response)[0]
                    console.log(xhr.response)
                    var volt = outletinfo.Voltage
                    var freq = outletinfo.Frequency
                    var adapter = outletinfo["Outlet Type"]
                    document.getElementById('power-adapter-label').innerHTML = "Outlet Type: " + adapter;
                    document.getElementById('power-voltage-label').innerHTML ="Voltage: " + volt;
                    document.getElementById('power-frequency-label').innerHTML ="Frequency: " + freq;
                }
            }
            xhr.send();
            
            trySettingWeatherData(destination_city, destination_country);
            var destination_currency = JSON.stringify(data.currencies[0].code).replace(/\"/g, "");
            destination_language_code = JSON.stringify(data.languages[0].iso639_1).replace(/\"/g, "");
            console.log(destination_language_code);
            currencyExchangeRate(source_currency,destination_currency);
            //populate elements for user
            document.getElementById('source').innerHTML = source_city + ', ' + source_country;
            document.getElementById('destination').innerHTML = destination_city + ', ' + destination_country;
            
            //calls functions 
            updateLanguage(destination_country); //destination
            //updateTimeZone(source_country, destination_country); // source, destination
            checkIfEverythingDone();
            
        })
        .catch(err => {
            console.log(err);
            checkIfEverythingDone();
        });
    })
    .catch(err => {
        console.log(err);
        checkIfEverythingDone();
    });
    
}

// Called when window is loaded -- MAIN
window.onload = function()
{
    this.showLoadingScreen()
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
    
    //Need to use actual source and destination country
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

    document.getElementById("delete-list-button").style.display = 'none';

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


                langCode=country.languages[0].iso639_1;
            
                if (langCode == "en")
                {
                    document.getElementById("phrases-view").style.display = "none";
                    document.getElementById("generate-translation-button").style.display = "none";
                    document.getElementById("export-translation-button").style.display = "none";
    
                }

                console.log("Language Code: " + langCode);
                found = 1;
            }
        });
        
        if(found == 1) {
            document.getElementById("p-language-output").innerHTML = "Primary Language: " + lang;
            languageChoice = lang;
        }
        else {
            document.getElementById("p-language-output").innerHTML = "Could not find language for " + name_of_country;
            languageChoice = "English";
        }
    }
}

// function updateTimeZone(source_name_of_sCountry, dest_name_of_country) 
// {
//     var request = new XMLHttpRequest();
//     request.open('GET', "https://restcountries.eu/rest/v2/");
//     request.send();
//     request.onload = function() {
//         var data = JSON.parse(this.response);
//         var sfound = 0;
//         var stimezone;
//         var dfound = 0;
//         var dtimezone;
//         data.forEach(country => {
//             if(source_name_of_sCountry == dest_name_of_country){
//                 if(request.status >=200 && request.status < 400 && country.name == source_name_of_sCountry){
//                     if(country.timezones.length == 1) {
//                         stimezone = country.timezones[0];
//                         sfound = 1;
//                         dtimezone = country.timezones[0];
//                         dtimezone = country.timezones[0];
//                     }
//                     //
//                     //Need to look for city too.. perhaps in next sprint?
//                     //
//                     else {
//                         sfound = 2;
//                         console.log("Error, multiple time zones detected(source country)... choosing first one");
//                         stimezone = country.timezones[0];
//                         dfound = 2;
//                         console.log("Error, multiple time zones detected(dest country)... choosing first one");
//                         dtimezone = country.timezones[0];
//                     }
//                 }
//             }
//             else if(request.status >=200 && request.status < 400 && country.name == source_name_of_sCountry) {
//                 if(country.timezones.length == 1) {
//                     stimezone = country.timezones[0];
//                     sfound = 1;
//                 }
//                 //
//                 //Need to look for city too.. perhaps in next sprint?
//                 //
//                 else {
//                     sfound = 2;
//                     console.log("Error, multiple time zones detected(source country)... choosing first one");
//                     stimezone = country.timezones[0];
//                     console.log("Source : " + stimezone);
//                 }
//             }
//             else if(request.status >=200 && request.status < 400 && country.name == dest_name_of_country) {
//                 if(country.timezones.length == 1) {
//                     dtimezone = country.timezones[0];
//                     dfound = 1;
//                 }
//                 //
//                 //Need to look for city too.. perhaps in next sprint?
//                 //
//                 else {
//                     dfound = 2;
//                     console.log("Error, multiple time zones detected(dest country)... choosing first one");
//                     dtimezone = country.timezones[0];
//                     console.log("Dest : " + dtimezone);
//                 }
//             }
//         });
        
//         if(sfound == 1) {
//             console.log('Source Time zone = ' + stimezone);
//             document.getElementById("source-time-zone").innerHTML = "Source Time Zone: " + stimezone;
//         }
//         else if (sfound == 2) {
//             document.getElementById("source-time-zone").innerHTML = "Source Time Zone: " + stimezone;
//         }
//         else {
//             document.getElementById("source-time-zone").innerHTML = "Could not find time zone for " + source_name_of_sCountry;
//         }
        
//         if(dfound == 1) {
//             document.getElementById("dest-time-zone").innerHTML = "Destination Time Zone: " + dtimezone;
//         }
//         else if (dfound == 2) {
//             document.getElementById("dest-time-zone").innerHTML = "Destination Time Zone: " + dtimezone;
//         }
//         else {
//             console.log(dfound);
//             document.getElementById("dest-time-zone").innerHTML = "Could not find time zone for " + dest_name_of_sCountry;
//         }
        
        
        
//         // calculating lost/gained time
//         if(dfound != 0 && sfound != 0) { 
            
//             //getting source time zone into float
//             var source_hours;
            
//             stimezone = stimezone.substring(3);
//             if(stimezone == "") {
//                 source_hours = 0;
//             }
//             else {
//                 //convert to format 
//                 //-0800
//                 var sOperator = stimezone.charAt(0);
//                 var shours = stimezone.charAt(1) + stimezone.charAt(2);
//                 var sminutes = stimezone.charAt(4) + stimezone.charAt(5);
//                 source_hours = parseInt(shours);
//                 var source_minutes = parseInt(sminutes);
//                 source_minutes = source_minutes / 60;
//                 source_hours = source_hours + source_minutes;
//                 if(sOperator == "-") source_hours = source_hours * -1;
//             }
            
//             //getting dest time zone into float
//             dtimezone = dtimezone.substring(3);
//             var dest_hours;
//             if(dtimezone == "") {
//                 dest_hours = 0;
//             }
//             else {
//                 var dOperator = dtimezone.charAt(0);
//                 var dhours = dtimezone.charAt(1) + dtimezone.charAt(2);
//                 var dminutes = dtimezone.charAt(4) + dtimezone.charAt(5);
//                 dest_hours = parseInt(dhours);
//                 var dest_minutes = parseInt(dminutes);
//                 dest_minutes = dest_minutes / 60;
//                 dest_hours = dest_hours + dest_minutes;
//                 if(dOperator == "-") dest_hours = dest_hours * -1;
//             }
            
//             //calculating change in time zone
//             var time_change = dest_hours - source_hours;
//             console.log(time_change);
//             if(time_change < 0) {
//                 time_change = time_change * - 1;
//                 document.getElementById("time-zone-change").innerHTML = "Time Zone Change: You will Lose " + time_change.toString() + " hours";
//             }
//             else if (time_change > 0){
//                 document.getElementById("time-zone-change").innerHTML = "Time Zone Change: You will Gain " + time_change.toString() + " hours";
//             }
//             else {
//                 document.getElementById("time-zone-change").innerHTML = "Time Zone Change: You will not change time zones";
//             }
//         }
//     }
// }


function updateTimeZone(stimezone, dtimezone) {
        
    console.log('Source Time zone = ' + stimezone);
    document.getElementById("source-time-zone").innerHTML = "Source Time Zone: " + stimezone;
    document.getElementById("dest-time-zone").innerHTML = "Destination Time Zone: " + dtimezone;

    // calculating lost/gained time
        
    //getting source time zone into float
    var source_hours;
        
    stimezone = stimezone.substring(3);
    if(stimezone == "") {
        source_hours = 0;
    }
    else {
            //convert to format 
        //-0800
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

function showTranslationsEditable() {
    
    hideLoadingScreen()
    darkenBackground();
    
    document.getElementById("delete-list-button").style.display = 'none';

    var listName = "translate";
    currentTable = listName;
    // get the editable view to be showed
    var editableView = document.getElementById('editable-list-view');
    var editableList = document.getElementById('editable-list');
    // get the right list from tableName
    var listData = listOfTranslated["translated"]; 
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
    // repopulateCenterPhrasesByName(listName);
    
    
    // set addNewElement action
    
    editableView.style.display = 'flex';
    //var closeView = document.getElementById("close-editable-button").addEventListener('click', console.log("Close Was Pressed!!!!!!!!!!!!!!"));
}


//called when view translations is pressed - THIS IS THE FUNCTION WHICH TRANLSATES EVERYTHING
function populateTranslations() 
{
    //showLoadingScreen(); 

    document.getElementById("translate-list").innerHTML = "";
    var listVals = listOfPhrases["phrases"];
    
    var url_space = "%2C%20"
    var url_setLang = "&target="+destination_language_code;
    console.log(destination_language_code);
    
    // iterate throught phrases, translating one at a time
    
    for (var i = 0; i < listVals.length; ++i)
    {
        //create element using item
        
        var li = document.createElement("li");
        li.classList.toggle("list-view-item");
        
        //parse phrase and convert to url
        var api_url = "source=en&q=";
        console.log(listVals[i].name);
        phrase = listVals[i].name.split(" ");
        // console.log(phrase);
        for (var j = 0; j < phrase.length; ++j)
        {
            api_url = api_url + phrase[j] + url_space;
        }
        //run API calls

        var data = api_url + url_setLang;
        // console.log(data);
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener("readystatechange", function () 
        {
            //place translated phrase in translated phrases array
            if (this.readyState === this.DONE) {
                var translatedPhrase = JSON.parse(this.responseText).data.translations[0].translatedText;
                if(translatedPhrase.charAt(translatedPhrase.length -1) == ',') {
                    translatedPhrase = translatedPhrase.substring(0, translatedPhrase.length - 1);
                }
                console.log("Translated Phrase: " + translatedPhrase);
                translateList[i] = {name: translatedPhrase, translated: true};
                
                checkIfTranslationsDone();
            }
        });
        
        xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2", false);
        xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "74af4218f0msh230f6d471685153p1b4bc6jsn758dfbb4cccb");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        
        xhr.send(data);
    }
    
}

function checkIfTranslationsDone()
{
    for (var i = 0; i < translateList.length; ++i)
        if (!translateList[i].translated)
            return
    // means all translations are ready
    console.log(translateList)
}


function repopulateTranslationList(listName)
{
    // empty list
    document.getElementById("editable-list").innerHTML = "";
    
    var listVals = listOfTranslated["translated"];
    
    for (var i = 0; i < listVals.length; ++i)
    {
        var li = createEditablePhraseItem(listVals[i]);
        
        // add element to translation list
        document.getElementById("editable-list").appendChild(li);
    }
}


function openTranslationWindow()
{
    showLoadingScreen()
    //document.getElementById('translate').style.display = "block";
    listOfTranslated["translated"].length = 0;
    populateTranslations(); //translate phrases
    repopulateTranslationList("translate");
    var commonPhrases = listOfPhrases["phrases"];
    var translatedPhrases = listOfTranslated["translated"]; 

    for (var i = 0; i < commonPhrases.length; i++) {
        console.log("Phrase" + i + ": " + commonPhrases[i].name);
    }
    for (var i = 0; i < commonPhrases.length; i++) {
        console.log("Translation" + i + ": " + translatedPhrases[i].name);
    }
    showTranslationsEditable();
    // translateText("Hello");
    
}

function exportTranslatedPhrases() {
    populateTranslations();
    var commonPhrases = listOfPhrases["phrases"];
    var translatedPhrases = listOfTranslated["translated"]; 

    for (var i = 0; i < commonPhrases.length; i++) {
        console.log("Phrase" + i + ": " + commonPhrases[i].name);
    }
    for (var i = 0; i < commonPhrases.length; i++) {
        console.log("Translation" + i + ": " + translatedPhrases[i].name);
    }



    //combining into one list

    var exportList = new Array();
    for (var i = 0; i < commonPhrases.length; i++) {
        var row = new Array();
        row.push("\"" + commonPhrases[i].name + "\"");
        row.push("\"" + translatedPhrases[i].name + "\"");
        exportList.push(row);
    }
    
    
    var csv = 'Phrase,Translation\n';
    exportList.forEach(function(row) {
        csv+= row.join(',');
        csv += "\n";
    });
    
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv);
    hiddenElement.target ='_blank';
    hiddenElement.download ='translations.csv';
    hiddenElement.click();
}

function saveTrip() {
    var source = document.getElementById("source").textContent;
    var s_array = source.split(" ");
    var s_array2 = s_array[0].split(",");
    var dest = document.getElementById("destination").textContent;
    var d_array = dest.split(" ");
    var d_array2 = d_array[0].split(",");
    var date = document.getElementById("departure-time").textContent;
    var date_array = date.split(" ");
    var oldTrip = s_array2[0] + " to " + d_array2[0] + " on " + date_array[4];
    
    //send old trip to database here
    console.log("Need to send this to old trips database: " + oldTrip);
}

// Wait for everything to be ready and then hide the loading screen
var everythingReadyCounter = 0;
function checkIfEverythingDone()
{
    ++everythingReadyCounter;
    if (everythingReadyCounter == 5)
    {
        hideLoadingScreen();
        sendTripInfo(JSON.parse(sessionStorage.getItem('travel_json')), listOfLists)
    }

    //TODO: check if this is out of date
    // if (everythingReadyCounter == 4)
    // hideLoadingScreen();
}





