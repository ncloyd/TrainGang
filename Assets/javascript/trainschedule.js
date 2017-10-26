  var config = {
    apiKey: "AIzaSyDAo5cnvd_XvIP-TPHq_zMpGDdM2SIZFj8",
    authDomain: "train-f567d.firebaseapp.com",
    databaseURL: "https://train-f567d.firebaseio.com",
    projectId: "train-f567d",
    storageBucket: "",
    messagingSenderId: "344463584957"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on('click', function(){
    // event.preventDefault();

    //grab user input
    var newName = $("#name-input").val().trim();
    var newDestination = $("#destination-input").val().trim();
    var newTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    var newFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: newName,
        destination: newDestination,
        time: newTime,
        frequency: newFrequency
    }

    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // alert("Train added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    return false;
});


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var newName = childSnapshot.val().name;
    var newDestination = childSnapshot.val().destination;
    var newTime = childSnapshot.val().time;
    var newFrequency = childSnapshot.val().frequency;


    var firstTimeConverted = moment(newTime, "HH:mm");
    console.log(firstTimeConverted);
    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + currentTime);

    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
   
    console.log("Difference in Time: " + timeDiff);
    // find Remainder of the time left and store in a variable
    var timeRemainder = timeDiff % newFrequency;
    
    // to calculate minutes till train,we store it in a variable
    var minToTrain = newFrequency - timeRemainder;
    // next train
    var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    $("#train-table > tbody").append("<tr><th>" + newName + "</th><td>" 
    + newDestination + "</td><td>" + newFrequency + "</td><td>" + newTime + "</td><td>" + nxTrain + "</td><td>" + minToTrain +"</td></tr>");
});