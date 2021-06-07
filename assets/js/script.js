//Page Selectors
var homeEL = document.querySelector("#home-page");
var quizEl = document.querySelector("#quiz-page");
var highEl = document.querySelector("#scores-page");
//Buttton Selectors
var startBTN = document.getElementById("start-game");
var playBTN = document.getElementById('play-again');
var quizQEl= document.getElementById('question');
var ans1El = document.getElementById('answer1');
var ans2El = document.getElementById('answer2');
var ans3El = document.getElementById('answer3');
var ans4El = document.getElementById('answer4');

//High Scores Page Selectors
var highScore = document.getElementById('high-scores');
var nameSubmit = document.getElementById('submit-name');
var typeName= document.getElementById('nameInput');
var nameHead= document.getElementById('nameInput1')

//Timer and ScoreHUD
var timerEl = document.getElementById('timer');
var scoreEl = document.getElementById('current-score');

//Objects
var possible = [];
var qIndex = 0;
var selectedAnswer = "";
var score = 0;
var timeLeft = 60;
var highScores = JSON.parse(localStorage.getItem("high-scores")) || [];

var q1 = {
    question : 'I declare this the summer of _____!!!!',
    correct : "GEORGE",
    incorrect : ["WHITE BOY", "HOT GIRL", "KRAMER",],
    };
var q2 = {
    question : "...hello... ______...",
    correct : "Newman",
    incorrect : ["Watley", "Elaine", "Putty",],

    };
var q3 = {
    question : "No _____ for you!!!",
    correct : "SOUP",
    incorrect : ["PEZ", "SPONGE", "COFFEE",],

    };
var q4 = {
    question : "I am master of my _____.",
    correct : "domain",
    incorrect : ["house", "work", "game",],

    };
var q5 = {
    question : "I dont wanna be a ______!",
    correct : "Pirate",
    incorrect : ["close talker", "joker", "smoker",],

    };
var q6 = {
    question : "_____ is the most sensual of the cured meats",
    correct : "Pastrami",
    incorrect : ["Mortadella", "Peparoni", "Corned beef",],

    };
var q7 = {
    question : "You know I've always wanted to pretend I was a(n) ______",
    correct : "architect",
    incorrect : ["police officer", "importer/exporter", "baseball player",],
    };
var q8 = {
    question : "If you look ______ all the time, people think that you're busy.",
    correct : "annoyed",
    incorrect : ["happy", "busy", "frantic",],

    };
var q9 = {
    question : "You're killing ______ George!",
    correct : "independant",
    incorrect : ["successful", "big", "happy",],

    };
var q10 = {
    question : "I just couldn't decide if he was _____ worthy.",
    correct : "sponge",
    incorrect : ["Elaine", "home", "date",],

    };
var q11 = {
    question : "Three _____? You can't spare three ______? ",
    correct : "squares",
    incorrect : ["seconds", "pieces", "jujifruits",],
    };
var q12 = {
    question : "These ______ are making me thirsty!",
    correct : "pretzels",
    incorrect : ["chips", "Mackinaw peaches", "bagels",],

    };
var q13 = {
    question : "_____ NOW!!!",
    correct : "SERENITY",
    incorrect : ["APOCALYPSE", "GO", "HEY",],

    };
var qAA = {
    question : "That is one magic ______.",
    correct : "loogie",
    incorrect : ["marker", "jumping bean", "moment",],

    };
var qBB = {
    question : "It's a _____ for the rest of us",
    correct : "festivus",
    incorrect : ["dinner", "home", "place",],

    };
var qCC = {
    question : "When the phone rings, you have to answer '______.' ",
    correct : "Vadelay Industries",
    incorrect : ["Kenny Rogers Roasters", "Jerry's House", "Baskin Robbins",],
    };

var allQuestions = [q1, q2, q3, q4, q5, q6, q7, q8, q9 ,q10, q11, q12, q13, qAA, qBB, qCC];
//adding correct answers to incorrect answers and shuffling possible answers 

function createArray(){
    if (qIndex < allQuestions.length){
    possible = allQuestions[qIndex].incorrect.concat(allQuestions[qIndex].correct);
    }else{
        timeLeft -= timeLeft
    }
};
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

//Shuffling Array and Cycling Through Array
function displayAnswers(){
    createArray();
    shuffleArray(possible);
    quizQEl.textContent= allQuestions[qIndex].question
    ans1El.textContent= possible[0];
    ans2El.textContent= possible[1];
    ans3El.textContent= possible[2];
    ans4El.textContent= possible[3];
    };
function setQIndex(qIndex){
    if (qIndex > (allQuestions.length-1)){
        qIndex === 0}
};

//Scoring Function
function quizScore(selectedAnswer){
    if(selectedAnswer === allQuestions[qIndex].correct){
        score += 5
    }
    else{
        timeLeft -= 5
    }
};


//Page Navagation
function init(){
    homeEL.setAttribute("style", "display: block")
}
init();

startBTN.addEventListener('click', function() {
    homeEL.setAttribute("style", "display: none");
    quizEl.setAttribute("style", "display: block");
    gameClock();
});

//playBTN.addEventListener("click", function() {
  //  location.reload()
//});

//pulling stored info from local storage to create high scores page
function saveScore(){
    var userName = typeName.value
    var userScore = score;
    var finalScore = {userName, userScore};
    highScores.push(finalScore);
    localStorage.setItem("high-scores", JSON.stringify(highScores));
    
};
function popScores(){
    highScores.sort(function (a,b){
        return b.userScore - a.userScore;
    })
    highScore.innerHTML = "";
    highScores.forEach(function(person){
        var listEl = document.createElement("li")
        listEl.textContent = "user: " + person.userName + "- Score " + person.userScore;
        highScore.appendChild(listEl);
    })
}

//CLOCK FUNCTION
function gameClock(){
    quizQEl.textContent = allQuestions[qIndex].question;
    displayAnswers();
    timeLeft = 60
    var timeInterval = setInterval(function(){
        if(timeLeft > 0){
            scoreEl.textContent = "Score: " + score
            timerEl.textContent = "You have " + timeLeft + " seconds left";
            timeLeft--;
        }else{   
            timerEl.textContent = "Game over";
            clearInterval(timeInterval);
            quizEl.setAttribute('style', 'display:none');
            highEl.setAttribute('style', 'display:block');
        };
    }, 1000);
};

//Answer Buttons
ans1El.addEventListener('click', function(){
    selectedAnswer = ans1El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});
ans2El.addEventListener('click', function(){
    selectedAnswer = ans2El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});
ans3El.addEventListener('click', function(){
    selectedAnswer = ans3El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});
ans4El.addEventListener('click', function(){
    selectedAnswer = ans4El.textContent;
    quizScore(selectedAnswer);
    qIndex++;
    setQIndex(qIndex);
    displayAnswers();   
});

//Name Submit Button
nameSubmit.addEventListener('click', function(){
    if (typeName.value !== ""){
        saveScore();
        popScores();
        typeName.setAttribute("style", "display: none");
        nameSubmit.setAttribute("style", "display: none");
        nameHead.setAttribute('style', 'display: none')
    }else{
        alert("You don't look like an O'brien, enter your name!")
    }
});