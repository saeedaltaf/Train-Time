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

//initial values:
  var name = "";
  var destination = "";
  var startTime = 0;
  var frequency = 0;

//button to add trains:
  $("#addTrainBtn").on("click", function(event){
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




