// Get data from database for lists right here
var toiletriesList = new Array();
var medicinesList = new Array();
var electronicsList = new Array();
var clothesList = new Array();

var listOfLists;

//       TEMPORARY CODE
// ****************************
toiletriesList.push({name: "Toothbrush", checked: false});
toiletriesList.push({name: "Toothpaste", checked: false});
toiletriesList.push({name: "Shampoo", checked: false});
toiletriesList.push({name: "Bathwash", checked: false});

medicinesList.push({name: "Medicine 1", checked: false});
medicinesList.push({name: "Medicine 2", checked: false});
medicinesList.push({name: "Medicine 3", checked: false});

electronicsList.push({name: "Laptop", checked: false});
electronicsList.push({name: "Laptop charger", checked: false});
electronicsList.push({name: "Smartphone", checked: true});

clothesList.push({name: "3 Jackets", checked: false});
clothesList.push({name: "1 Rain Jacket", checked: false});
clothesList.push({name: "2 Pants", checked: false});

listOfLists = { 
                'toiletries': toiletriesList,
                'medicines': medicinesList,
                'electronics': electronicsList,
                'clothes': clothesList
              };
// ****************************

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
    var newLi = createEditableListItem(itemVal);
    
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
        var newElement = { name: labelVals[1].innerText, checked: (labelVals[1].style.textDecoration == 'line-through')};
        newList.push(newElement);
    }
    
    listOfLists[currentTable] = newList;

    // repopulate the appropriate table
    repopulateListByName(currentTable);

    // reset the heading as needed
    document.getElementById(currentTable).getElementsByTagName("h2")[0].innerHTML = editableView.getElementsByTagName("h2")[0].innerHTML;

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
    
}

// Called when window is loaded
window.onload = function()
{
    loadData();

    // Populate all the lists with the data
    repopulateAllLists();
    // Add action listeners for the lists
    var keyList = Object.keys(listOfLists);
    for (var i = 0; i < keyList.length; ++i)
    {
        this.document.getElementById(keyList[i]).addEventListener("click", showEditableView);
    }
    // hide the center view
    this.document.getElementById('editable-list-view').style.display = 'none';
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
}