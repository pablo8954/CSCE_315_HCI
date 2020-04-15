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

function createCheckbox(alreadyChecked)
{
    var checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'checkbox-label';
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (alreadyChecked)
        checkbox.checked = alreadyChecked;
    var span = document.createElement('span');
    span.className = "checkbox-custom";

    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(span);

    checkbox.addEventListener('change', function(eve)
    {
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

function createEditableListItem(itemVal)
{
    // create element using item
    var li = document.createElement('li');
    li.classList.toggle('editable-list-item');

    // add check through option here
    var checkbox = createCheckbox(itemVal.checked);

    // add the label
    var value = document.createElement("label");
    value.innerText = itemVal.name;
    value.className = 'editable-list-label';
    value.contentEditable = true;
    if (itemVal.checked)
    {
        value.style.textDecoration = 'line-through';
    }

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

    // li.addEventListener('click', function(eve)
    // {
    //     console.log(eve.target.tag + ' clicked');
    //     var theLabel = eve.target.getElementsByTagName('label')[0];
    //     theLabel.focus();
    // });

    li.append(checkbox);
    li.append(value);
    li.appendChild(deleteButton);

    return li;
}

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

}

function repopulateAllLists()
{
    var keyList = Object.keys(listOfLists);
    for (var i = 0; i < keyList.length; ++i)
    {
        repopulateListByName(keyList[i]);
    }
}

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


    // set addNewElement action

    editableView.style.display = 'flex';

}


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

    // close the editable view
    editableView.style.display = 'none';

    lightenBackground();
}

window.onload = function()
{
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
    this.document.getElementById('darkener').hidden = true;
    this.document.getElementById('darkener').addEventListener('click', this.closeEditableView);

    this.document.getElementById('darkener').classList.toggle('unclickable');
    this.document.getElementById('add-button').addEventListener('click', this.addNewElement);
}

// // Create a "close" button and append it to each list item
// var listItems = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < listItems.length; i++) 
// {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     listItems[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) 
// {
//     close[i].onclick = function() 
//     {
//         var div = this.parentElement;
//         div.style.display = "none";
//     }
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) 
// {
//     if (ev.target.tagName === 'LI') {
//         ev.target.classList.toggle('checked');
//     }
// }, false);

// /////////////////////////
// //  onClick Functions  //
// /////////////////////////

// function showBigList(listID)
// {
//     darkenBackground();
//     var listToShow = listID + "-big";
//     var bigList = document.getElementById(listToShow);
//     bigList.hidden = false;
// }

// function hideBigList(listID)
// {
//     var list = document.getElementById(listID);
//     list.hidden = true;
// }


// // Create a new list item when clicking on the "Add" button
// function newElement(listID) 
// {
//     // Create new element with the input value
//     var li = document.createElement("li");
//     var inputValue = document.getElementById("inputVal").value;
//     var t = document.createTextNode(inputValue);
//     li.appendChild(t);
//     // Make sure value isn't empty
//     if (inputValue === '') 
//     {
//         alert("You must write something!");
//     }
//     else 
//     {
//         document.getElementById(listID).appendChild(li);
//     }

//     // Set it back to empty
//     document.getElementById("inputVal").value = "";
    
//     // Add the close button
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);
    
//     close = document.getElementsByClassName("close");
//     for (i = 0; i < close.length; i++) 
//     {
//         close[i].onclick = function() 
//         {
//             var div = this.parentElement;
//             div.style.display = "none";
//         }
//     }
// }

// Darken the background when opening up a card
function darkenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0.8;
    darkener.hidden = false;
    this.document.getElementById('darkener').classList.toggle('unclickable');
}

function lightenBackground()
{
    var darkener = document.getElementById("darkener");
    darkener.style.opacity = 0;
    darkener.hidden = true;
    this.document.getElementById('darkener').classList.toggle('unclickable');
}