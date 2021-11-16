var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var answerCheck = document.getElementById("answerCheck");
var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");
var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAnswer = 0;
var questionIndex = 0;
var totalTime = 180;

const questions = [
    {
        question: "How do you link the Javascript file into the HTML file?",
        choices: [
            "a. <js>", 
            "b. <javascript>", 
            "c. <file>", 
            "d. <script>"
        ],
        answer: "d. <script>"
    },
    {
        question: "These must be used when assigning strings to variables.",
        choices: [
            "a. commas", 
            "b. curly brackets", 
            "c. quotes", 
            "d. parenthesis"
        ],
        answer: "c. quotes"
    },
    {
        question: "What is the name associated with the event usually added to buttons in Javascript?",
        choices: [
            "a. onclick", 
            "b. onchange", 
            "c. whenclicked", 
            "d. onSelect"
        ],
        answer: "a. onclick"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: [
            "a. strings", 
            "b. booleans", 
            "c. images", 
            "d. numbers"
        ],
        answer: "c. images"
    },
    {
        question: "How do you create a function in JavaScript",
        choices: [
            "a. function = myFunction()", 
            "b. function myFunction()", 
            "c. function:myFunction()", 
            "d. createMyFunction()"
        ],
        answer: "b. function myFunction()"
    },
    {
        question: "How do you call a function named myFunction?",
        choices: [
            "a. call myFunction()", 
            "b. call function myFunction()", 
            "c. myFunction()", 
            "d. call myFunction"
        ],
        answer: "c. myFunction()"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: [
            "a. numbers and strings", 
            "b. other arrays", 
            "c. booleans", 
            "d. all of the above"
        ],
        answer: "b. other arrays"
    },
    {
        question: "The first index of an array is ____.",
        choices: [
            "a. 0", 
            "b. 1", 
            "c. 2", 
            "d. 3"
        ],
        answer: "a. 0"
    },
    {
        question: "How do you add a comment in a JavaScript?",
        choices: [
            "a. //", 
            "b. <!---->", 
            "c. ''", 
            "d. **"
        ],
        answer: "a. //"
    },
    {
        question: "What is used to see if two variables are equal to each other?",
        choices: [
            "a. =", 
            "b. ==", 
            "c. 'equals'", 
            "d. !="
        ],
        answer: "b. =="
    }
];

function newQuiz() {
    questionIndex = 0;
    totalTime = 180;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAnswer++;
        answerCheck.textContent = "Nice!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "That is incorrect!"
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";
    finalScore.textContent = correctAnswer;
}

function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores();
}

var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listofHighScores.innerHTML = "High scores have been deleted.";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});