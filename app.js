// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyDs0t0AiiKnQC-v0X_00rot3nXX2lv8xD0",
    authDomain: "trains-a2ee2.firebaseapp.com",
    databaseURL: "https://trains-a2ee2.firebaseio.com",
    projectId: "trains-a2ee2",
    storageBucket: "trains-a2ee2.appspot.com",
    messagingSenderId: "640411410840",
    appId: "1:640411410840:web:7f0ba0572cb6d676"
};
// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();

//CURRENT TIME AND DATE USING MOMENT.JS:
var datetime = null,
    date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function () {
    datetime = $('#currentStatus')
    update();
    setInterval(update, 1000);

});

//initial values:
var name = "";
var destination = "";
var startTime = 0;
var frequency = 0;

//button to add trains:
$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();
    //grab user input:
    name = $("#trainNameInput").val().trim();
    destination = $("#trainDestination").val().trim();
    startTime = $("#startTime").val().trim();
    frequency = $("#trainFrequency").val().trim();

    console.log(name);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);
    //add trains to firebase database:
    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    });


    //clear out text boxes in "add train" section:
    $("#trainNameInput").val("");
    $("#trainDestination").val("");
    $("#startTime").val("");
    $("#trainFrequency").val("");
});//<---- this closes the on-click event for adding trains


// Firebase watcher + initial loader to add the data from firebase into the table:
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().startTime);
    console.log(childSnapshot.val().frequency);

    var getName = childSnapshot.val().name;
    var getDestination = childSnapshot.val().destination;
    var getStartTime = childSnapshot.val().startTime;
    var getFrequency = childSnapshot.val().frequency;
    var row = $("<tr>");

    // Calculating the time of next train arrival, and the minute until the next train arrives. Also, convert the start time // of the train to HH:mm (to be used by Momment.JS)

var currentTime = moment();

console.log("Current Time: " + moment(currentTime).format("HH:mm"));
// Used this as first time (pushed back 1 year to make sure it comes before current time)    
var convertedFirstTime = moment(getStartTime, "hh:mm").subtract(1, "years");

console.log(convertedFirstTime);

// Difference between the start time and the current time //
var diffTime = moment().diff(moment(convertedFirstTime), "minutes");

console.log("Difference in the time: " + diffTime) ;

// Divide the difference by the frequency to get the time apart remainder //

var tRemainder = diffTime % getFrequency;

console.log(tRemainder);

// Figure out when the next train will come by subracting the time remainder from the frequency of when each train comes //

var minutesAway = getFrequency - tRemainder; 

console.log("Minutes until train " + minutesAway);

// Figure out when the next train will come by adding the minutes from arrival to current time //

var nextTrain = moment().add(minutesAway, "minutes");

console.log(nextTrain);

// Store arrival time in a usable format //

var nextArrival = moment(nextTrain, "HHmm").format("h:mm A");

// Adding entry to the "Add Train" section //

var row = $('<tr>');



    row.append("<td>" + getName + "</td>")
    row.append("<td>" + getDestination + "</td>")
    row.append("<td>" + getStartTime + "</td>")
    row.append("<td>" + getFrequency + "</td>")
    row.append("<td>" + minutesAway + "</td>")

    $("#trainTable > tbody").append(row)


})




