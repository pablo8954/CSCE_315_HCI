// Get data from database for lists right here
var toiletriesList = new Array();
var medicinesList = new Array();
var electronicsList = new Array();
var clothesList = new Array();
var phraseList= new Array();

var listOfLists;
var listOfPhrases = {'phrases' : phraseList};

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

phraseList.push({name: "Where is the restroom?"});
phraseList.push({name: "Where is my hotel?"});
phraseList.push({name: "Where is the airport?"});
phraseList.push({name: "Where is a resturaunt?"});
phraseList.push({name: "Hi, how are you?"});
phraseList.push({name: "I dont speak your language?"});
phraseList.push({name: "How much does this cost?"});
phraseList.push({name: "What time is it?"});

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
	var newLi;
	if(currentTable == "phrases") newLi = createEditablePhraseItem(itemVal);
    else newLi = createEditableListItem(itemVal);

    document.getElementById('editable-list').appendChild(newLi);
    document.getElementById('add-input').value = '';
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
	}

    // close the editable view
    editableView.style.display = 'none';

    lightenBackground();
}

window.onload = function()
{
    // Populate all the lists with the data
    repopulateAllLists();
	populatePhraseList();
    // Add action listeners for the lists
    var keyList = Object.keys(listOfLists);
    for (var i = 0; i < keyList.length; ++i)
    {
        this.document.getElementById(keyList[i]).addEventListener("click", showEditableView);
    }
	this.document.getElementById('phrases').addEventListener("click", showPhrasesEditableView);
    // hide the center view
    this.document.getElementById('editable-list-view').style.display = 'none';
    this.document.getElementById('darkener').hidden = true;
    this.document.getElementById('darkener').addEventListener('click', this.closeEditableView);

    this.document.getElementById('darkener').classList.toggle('unclickable');
    this.document.getElementById('add-button').addEventListener('click', this.addNewElement);
    document.getElementById("add-input").addEventListener("keyup", function(event)
    {
        event.preventDefault();
        if (event.keyCode === 13) // enter pressed
        {
            document.getElementById("add-button").click();
        }
    });
    this.document.getElementById('close-editable-button').addEventListener('click', this.closeEditableView);
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
    });

    li.append(value);
    li.appendChild(deleteButton);

    return li;
}

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