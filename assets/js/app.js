$(document).ready(function () {

    $(".startButton").on("click", function () {
        game.startGame();
    });

    $(document).on("click", ".buttons", function () {
        var buttonClicked = $(this).text()
        game.guessChecker(buttonClicked);  
    });

    $(".contentWrapper").hide();

    var game = {

        questions: {
            q1: "Which of the following is NOT a class?",
            q2: "Which school of magic is used to tell fortunes?",
            q3: "What is the most common enemy for low-leveled characters to fight?",
            q4: "Which of these races is known for their short but stocky builds, a penchant for blacksmithing, and great big beards?",
            q5: "Which of the following is an actual technique a Monk might use?"
        },

        answers: {
            q1: ["Fighter", "Druid", "Cook", "Monk"],
            q2: ["Divination", "Necromancy", "Conjuration", "Lying"],
            q3: ["Dragons", "Goblins", "A Literal Army", "Old People"],
            q4: ["Elves", "Halflings", "Orcs", "Dwarves"],
            q5: ["Stunning Fist", "Punchy Style", "Really Hard Kick", "Super Fist of the Nose Hair"]
        },

        correctAnswers: {
            q1: "Cook",
            q2: "Divination",
            q3: "Goblins",
            q4: "Dwarves",
            q5: "Stunning Fist"
        },

        currentQuestion: 0,

        correct: 0,

        incorrect: 0,

        unanswered: 0,

        timerRunning: false,

        timerInterval: "",

        timeOut: false,

        startGame: function () {
            game.currentQuestion = 0;

            clearInterval(game.timerInterval);

            $(".contentWrapper").show();

            $(".rightWrong").empty();
            $(".question").empty();
            $("#choices").empty();
            $(".results").empty();

            $(".timer").text("Time Left: " + game.timer);

            $(".startButton").hide();

            game.nextQuestion();
        },

        nextQuestion: function () {

            game.timer = 10;

            $(".timer").text("Time Left: " + game.timer);

            if (!game.timerOn) {
                game.timerInterval = setInterval(game.timerRunning, 1000);
            }

            var questionText = Object.values(game.questions)[game.currentQuestion];
            $(".question").text(questionText);

            var questionChoices = Object.values(game.answers)[game.currentQuestion];

            $.each(questionChoices, function (index, key) {
                $("#choices").append($("<button class='buttons'>" + key + "</button>"));
            })
        },

        timerRunning: function () {
            if (game.timer > -1 && game.currentQuestion < Object.keys(game.questions).length) {
                $(".timer").text("Time Left: " + game.timer);
                game.timer--;
            } else if (game.timer === -1) {
                game.unanswered++;
                game.result = false;
                clearInterval(game.timerInterval);
                $(".timer").empty();
                $(".question").empty();
                $("#choices").empty();
                resultTimeout = setTimeout(game.guessResult, 3000);
                $(".rightWrong").text("Out of time! The answer was " + Object.values(game.correctAnswers)[game.currentQuestion]);
            }
            else if (game.currentQuestion === Object.keys(game.questions).length) {

                $(".results").html(
                    "<h2>Check out your loot</h2>" +
                    "<p>Correct: " + game.correct + "</p>" +
                    "<p>Incorrect: " + game.incorrect + "</p>" +
                    "<p>Unaswered: " + game.unanswered + "</p>"
                );
                $(".question").empty();
                $(".timer").empty();
                $(".startButton").attr("id", "move");
                $(".startButton").show();
            }
        },

        guessChecker: function (buttonClicked) {

            var resultTimeout;

            var currentAnswer = Object.values(game.correctAnswers)[game.currentQuestion];
            
            if (buttonClicked === currentAnswer) {
                game.correct++;
                clearInterval(game.timerInterval);
                $(".timer").empty();
                $(".question").empty();
                $("#choices").empty();
                resultTimeout = setTimeout(game.guessResult, 3000);
                $(".rightWrong").html("Correct!");
            } else {
                game.incorrect++;
                clearInterval(game.timerInterval);
                $(".timer").empty();
                $(".question").empty();
                $("#choices").empty();
                resultTimeout = setTimeout(game.guessResult, 3000);
                $(".rightWrong").html("Wrong! The answer was " + currentAnswer);
            }
        },

        guessResult: function () {

            game.currentQuestion++;

            $("#choices").empty();
            $(".rightWrong").empty();

            game.nextQuestion();
        }
    }
});