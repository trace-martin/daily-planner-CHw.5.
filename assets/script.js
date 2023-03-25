// variable to store and loop through scheduler
// variable to store and loop through scheduler
var todaySchedule = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]
var saveBtn = document.getElementById('id..');
// //var userInput = 
// saveBtn.addEventListener('click', save);

// CALANDER - DISPLAYS CURRENT DATE

var displayDate = document.getElementById('currentDay');
const currentDay = new Date();
const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let wDay = weekDay[currentDay.getDay()];
let day = currentDay.getDate();
let month = currentDay.getMonth() + 1;
let year = currentDay.getFullYear();
let currentDate = `${wDay}, ${month}-${day}-${year}`;

console.log(currentDate);
displayDate.textContent = currentDate;

let currentHour = currentDay.getHours();
let currentTime = currentDay.getMinutes();
let currentMeridiem;

if (currentHour > 11){
    currentMeridiem = "PM"
}
else {currentMeridiem = "AM"};

// saves data to localStorage
function saveItems() {
    localStorage.setItem("todaySchedule", JSON.stringify(todaySchedule));
}

// sets any data in localStorage to the view
function displayItems() {
    todaySchedule.forEach(function (_currentHourBlock) {
        $(`#${_currentHourBlock.id}`).val(_currentHourBlock.reminder);
    })
}

// sets localStorage data to view if any
function init() {
    var itinerary = JSON.parse(localStorage.getItem("todaySchedule"));

    if (itinerary) {
        todaySchedule = itinerary;
    }

    saveItems();
    displayItems();
}

todaySchedule.forEach(function(currentHourBlock) {
    // creates timeblocks row
    var hourBlock = $("<div>").attr({
        "class": "row time-block"
    });
    $(".container").append(hourBlock);

    // creates time field
    var hourField = $("<div>")
        .text(`${currentHourBlock.hour}${currentHourBlock.meridiem}`)
        .attr({
            "class": "col-2 col-md-1 hour text-center py-3 "
    });

    // creates schdeduler data
    var hourItinerary = $("<div>")
        .attr({
            "class": "col-8 col-md-10 description p-0",
        });
    var itineraryContents = $("<textarea>");
    hourItinerary.append(itineraryContents);
    itineraryContents.attr("id", currentHourBlock.id);
    if (currentHourBlock.time < currentHour) {
        itineraryContents.attr ({
            "class": "col-8 col-md-12 past",
            "rows": "3" 
        })
    } else if (currentHourBlock.time === currentHour) {
        itineraryContents.attr({
            "class": "col-8 col-md-12 description present",
            "rows": "3" 
        })
    } else if (currentHourBlock.time > currentHour) {
        itineraryContents.attr({
            "class": "col-8 col-md-12 description future",
            "rows": "3" 
        })
    }
        // creates save button
        var saveItinerary = $("<button>")
        .attr({
            "class": "btn saveBtn col-2 col-md-1",
            "aria-label": "save"});
        var saveButton = $("<i class='fas fa-save' aria-hidden='true'></i>")
        
        saveItinerary.append(saveButton);
        hourBlock.append(hourField, hourItinerary, saveItinerary);
})
init();

// saves data to be used in localStorage..
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var savedTodos = $(this).siblings(".description").children(".future").attr("id");
    todaySchedule[savedTodos].reminder = $(this).siblings(".description").children(".future").val();
    //console log
    //console.log(savedTodos);
    saveItems();
    displayItems();
})
