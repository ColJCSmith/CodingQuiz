// This variable sets out the questions, range of options and correct answer.

var questions = [{
    question: "Commonly used data types DO NOT include:",
    choices: ["alerts", "booleans", "numbers", "strings"],
    correctAnswer: 0
}, {
    question: "The condition in an if/else statement is enclosed within __________",
    choices: ["curly braces", "parenthesis", "quotes", "square brackets"],
    correctAnswer: 1
}, {
    question: "Arrays in JavaScript can be used to store __________",
    choices: ["booleans", "numbers and strings", "other arrays", "all of the above"],
    correctAnswer: 3
}, {
    question: "String values must be enclosed within __________ when being assigned to variables.",
    choices: ["commas", "curly braces", "quotes", "parenthesis"],
    correctAnswer: 2
}, {
    question: "A very useful tool used during development and debugging for printing content to the degugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: 3
}];

//These variables set the starting point for the quiz.

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

//This statement starts the timer 

$("#startButton").on("click", function() {
    $(document).find("#nextButton").show();
    $(document).find("#startButton").hide();
    $(document).find("#title").hide();
    $(document).find("#intro").hide();
    var timeleft = 10;
    var quizTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(quizTimer);
        displayScore();
        $(document).find("#nextButton").hide();
        document.getElementById("countdown").innerHTML = "Time is up!";
      } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    }, 1000);

    $(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find("#nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                else {
                    timeleft -= 5;
                }
                
                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
    var initials = document.createElement("INPUT");
    initials.setAttribute("type", "text");
    initials.setAttribute("value", "Type your initials here to save your score");
    document.body.appendChild(initials);
}

function saveScore() {
    localStorage.setItem("Score", correctAnswers);
    localStorage.setItem("Player", initials);
    console.log(initials);
  }

function hideScore() {
    $(document).find(".result").hide();
}
});

document.getElementById(".highscore").innerHTML = localStorage.getItem("Score");