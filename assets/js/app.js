$(document).ready(function() {
    console.log("Hola Binches");
// Game will need to be written in a way that it can be played again without refreshing the page*** 

// Global Vars :
var startButtonPressed = false;
console.log("SBP: " + startButtonPressed);

var questions = {
    "q1": "qwerty", 
    "q2": "qwerty", 
    "q3": "qwerty", 
    "q4": "qwerty", 
    "q5": "qwerty"};

var answers = {
    "q1":["1", "2", "3", "4"],
    "q2":["1", "2", "3", "4"],
    "q3":["1", "2", "3", "4"],
    "q4":["1", "2", "3", "4"],
    "q5":["1", "2", "3", "4"]
};

var correctAnswers = {
    "q1":"1",
    "q2":"1",
    "q3":"1",
    "q4":"1",
    "q5":"1"
};

var timerRunning = false;

var timerInterval;

var timer = {

    time: 10,

    count: function() {
        $(".timer").text("Timer : " + timer.time); 
        if (timer.time != 0) {
            timer.time--;            
        } else {
            timer.stop();
            $(".timer").text("Time's Up!")            
        }
      },
    
    start: function() {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(timer.count, 1000);
            timer.count();
        };
    },

    stop: function() {
        clearInterval(timerInterval);
        timerRunning = false;
        time = 30;
    }
};

// Display start button
    // when hit, show question, answers, and timer (30 seconds)
$(".startButton").on("click", function() {
    // Hides start button
    startButtonPressed = true;
    $(".startButton").hide();
    console.log("SBP: " + startButtonPressed);

    // Call gameSet function
    gameSet();
});

function gameSet() {
    timer.start();
    $(".question").text(questions.q1)
    answers.q1.forEach(function(x) {
        var choice = $("<p>");
        choice.text(x);
        $("#choices").append(choice);
    })
};

// Display question, answer choices, and timer
    // Timer Ticks at 1 second intervals, put reset so interval won't compound
    // if it hits 0, stop at 0, say "Time's Up", display correct answer
    // if wrong, say "Wrong" and show right answer
    // if right, say "Correct"
    // Right, wrong, or timeout, pause the clock and wait 5~ seconds. Then move to next question (WITHOUT user input)

// Game Ends
    // Display number of correct and incorrect answers
    // Display timeouts (if there are none, don't. Idk how this will work out, but good luck)
    // ***Play again button that DOES NOT refresh the page, just starts the came over***


    //document.ready is needed for it to work in the head tag
// document.getElementById("choice1").innerHTML = "js test";

// $(".question").text("jQ test");

// console.log("js console test");

}); // ends the document ready