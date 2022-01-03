var resultsContainer = document.getElementById("results");
var resultsText = document.getElementById("results-text")
var questionContainer = document.getElementById("quiz-question");
var buttonsContainer = document.getElementById("buttons-container");
var banner = document.getElementById("banner");
var timer = document.getElementById("timer-text");
var startButton = document.getElementById("start");
var questionCounter = 0;
var numCorrect = 0;
var minute = 9;
var sec = 59;

// begin quiz
startButton.addEventListener("click", function() {
  buttonsContainer.removeChild(startButton);
  resultsContainer.removeChild(resultsText);
  // display time remaining 
  timer.innerHTML = "You have <span id='timer'>10:00<span> minutes"
  timerHandler = setInterval(function() {
    document.getElementById("timer-text").innerHTML = minute + " : " + sec;
    sec--;
    if (sec === 00 || sec < 0) {
      minute --;
      sec = 59;
      if (minute < 0) {
        minute = 0
        sec = 0
        showSubmitScreen();
      } 
    } if (sec < 10) {
      sec = `0${sec}`
    }
  }, 1000);
  displayQuestion();
   // default timeout 
   defaultTimeout = setTimeout(() => {
    showSubmitScreen();
  }, 600000);
});


// get the current question 
var setCurrentQuestion = function() {
  var currentQuestion = quizQuestions[questionCounter]; 
  return currentQuestion;
}

// display current question and answer option buttons 
var displayQuestion = function() {
  var currentQuestion = setCurrentQuestion();
  questionContainer.innerText = currentQuestion.question
      for (letter in currentQuestion.answers) {
        var optionButton = document.createElement("button")
        optionButton.className = "option-button"
        optionButton.textContent = currentQuestion.answers[letter];
        optionButton.value = letter;
        buttonsContainer.appendChild(optionButton);
        optionButton.addEventListener("click", optionButtonHandler);
      }
  };

  // handle right or wrong answer 
  var optionButtonHandler = function (event) {
    var currentQuestion = setCurrentQuestion();
    var userAnswer = event.target 
    // correct answer 
    if (userAnswer.value === currentQuestion.correctAnswer) {
      resultsText.innerText = currentQuestion.feedback
      resultsContainer.appendChild(resultsText);
      checkQuizProgress();
      numCorrect ++;
    // wrong answer 
    } else {
      resultsText.innerText = "Whoops wrong answer!"
      resultsContainer.appendChild(resultsText);
      checkQuizProgress();
      minute -= 2
      if (minute < 0) {
        window.alert("You timed out!");
        document.querySelector("#timer-text").innerHTML = "";
        showSubmitScreen();
      }
    }
    disableOptionButton();
    questionCounter ++;
  }
  
  // disable option button after first click 
  var disableOptionButton = function() {
    [ ... document.querySelectorAll('.option-button') ].map( 
      thisButton => thisButton.disabled = true 
    );
  }

  // proceed or end quiz 
  var checkQuizProgress = function() {
    if (questionCounter < quizQuestions.length-1) {
      showNextButton();
     } else {
      showSeeResultsButton();
    }
  };

  // if proceeding -> create "next" button 
  var showNextButton = function() {
    var nextButton = document.createElement("button")
    nextButton.className = "next-button"
    nextButton.innerHTML = "<span>Next</span>"
    resultsContainer.appendChild(nextButton);
    nextButton.addEventListener("click", nextButtonHandler);
  }
  // next button click -> next question 
  var nextButtonHandler = function() {
    buttonsContainer.innerHTML = "";
    resultsContainer.innerHTML = "";
    displayQuestion();
  }

  // if gone through all questions -> see results 
  var showSeeResultsButton = function() {
    var seeResultsButton = document.createElement("button")
    seeResultsButton.className = "next-button"
    seeResultsButton.innerHTML = "<span>See Results!</span>"
    resultsContainer.appendChild(seeResultsButton);
    seeResultsButton.addEventListener("click", function() {
      buttonsContainer.innerHTML = "";
      resultsContainer.innerHTML = "";
      showSubmitScreen();
    });
  };

  // if quiz ended -> submit initials and save score 
  var showSubmitScreen = function() {
    // stop timers 
    clearInterval(timerHandler);
    clearTimeout(defaultTimeout);
    // change the HTML elements 
    document.querySelector("#timer-text").innerHTML = "Let's see your score!"
    resultsContainer.innerHTML = "";
    buttonsContainer.innerHTML = "";
    questionContainer.innerText = "Good work learning JavaScript!"
    var displayScore = document.createElement("p")
    displayScore.className = "score-display"

    if (numCorrect === quizQuestions.length-1) {
      displayScore.innerText = `Your final score is ${numCorrect + 1}`;
    } else {
      displayScore.innerText = `Your final score is ${numCorrect}`
    }

    questionContainer.appendChild(displayScore);
    var initialForm = document.createElement("form")
    initialForm.className = "initial-form"
    questionContainer.appendChild(initialForm)
    var initialInput = document.createElement("div")
    initialInput.className = "initial-input"
    initialInput.innerHTML = "<input type='text' name='initials' placeholder='Enter your initials here' />"
    initialForm.appendChild(initialInput);
    initialForm.addEventListener("submit", showUserBoard)
    var submitButton = document.createElement("button")
    submitButton.id = "submit-button"
    submitButton.textContent = "Submit"
    initialForm.appendChild(submitButton);
    submitButton.addEventListener("click", showUserBoard)
  };

// setting and getting scores from LocalStorage
function getScores() {
  var userScores = JSON.parse(localStorage.getItem("userObj"));
  if (!userScores || !Array.isArray(userScores)) return []
  else return userScores;
}
function addScore(userObj) {
  var currentScores = getScores();
  currentScores.push(userObj);
  localStorage.setItem("userObj", JSON.stringify(currentScores))
}

// display list of past scores 
var displayScores = function () {
  // change html
  document.querySelector("#timer-text").innerHTML = "Past Scores";
  resultsContainer.innerHTML = "";
  buttonsContainer.innerHTML = "";
  questionContainer.innerHTML = "";
  var currentScores = getScores();
  var userBoardContainer = document.createElement("div");
  userBoardContainer.className = "user-score-list-container";
  questionContainer.appendChild(userBoardContainer);
  // loop through each score and add to list container 
  for (var user of currentScores) {
    console.log("Score", user);
    var userDiv = document.createElement("div");
    userDiv.className = "user-div";
    userDiv.innerHTML = `${user.initials} - ${user.score}`;
    userBoardContainer.appendChild(userDiv)
  }
  // create retry button
  var retryButton = document.createElement("button");
  retryButton.id = "retry-button";
  retryButton.textContent = "Try Again";
  userBoardContainer.appendChild(retryButton);
  retryButton.addEventListener("click", reload, false);
  // override default 
  function reload() {
    reload = location.reload();
  }
}

// display user board
var showUserBoard = function(event) {
  event.preventDefault();
  document.querySelector("#timer-text").innerHTML = "Past Scores";
   var userInitials = document.querySelector("input[name='initials']").value;
   var userObj = {
     initials: userInitials,
     score: numCorrect
    }
    addScore(userObj)
    displayScores();
}

// quiz questions array 
var quizQuestions = [
    {
      question: "Inside the HTML document, where do you place your JavaScript code?",
      answers: {
        a: "Inside the <script> element",
        b: "Inside the <link> element",
        c: "Inside the <head> element",
        d: "In the <footer> element"
      },
      correctAnswer: "a",
      feedback: "Nice job! You place your JavaScript inside the <script> element of the HTML Document is correct."
    },
    {
      question: "What operator is used to assign a value to a declared variable?",
      answers: {
        a: "Double-equal (==)",
        b: "Colon (:)",
        c: "Equal sign (=)",
        d: "Question mark (?)"
      },
      correctAnswer: "c",
      feedback: "Awesome! The correct way to assign a variable is with an equal sign(=)."
    },
    {
      question: "What are the six primitive data types in JavaScript?",
      answers: {
        a: "sentence, float, data, bigInt, symbol, undefined",
        b: "string, number, boolean, bigInt, symbol, undefined",
        c: "sentence, int, truthy, bigInt, symbol, undefined",
        d: "string, num, falsy, bigInt, symbol, undefined"
      },
      correctAnswer: "b",
      feedback: "Stellar! JavaScript has a total of six primitive data types: string, number, boolean, bigInt, symbol, undefined."
    },
    {
        question: "What is the difference between && and ||?",
        answers: {
          a: "The logical operator && returns true if both expressions are true while the logical operator || returns true if one expression or the other returns true.",
          b: "The logical operator && returns true if one expression is true while the logical operator || returns true if both expressions returntrue true.",
          c: "The logical operator && returns true if none of the expressions are true while the logical operator || returns true if one expression or the other returns true.",
          d: "The logical operator && returns true if both expressions are true while the logical operator || returns false if one expression or the other returns true."
        },
        correctAnswer: "a",
        feedback: "High-five! The logical operator && returns true if both expressions are true while the logical operator || returns true if one expression or the other returns true. Check out some of the other operators available to you in the MDN Web Docs."
      },
      {
        question: "How do we declare a conditional statement in JavaScript?",
        answers: {
          a: "difference...between",
          b: "for loop",
          c: "while loop",
          d: "if...else"
        },
        correctAnswer: "d",
        feedback: "Amazing! if... else is most definitely how we declare a conditional statement. This is something you will use every day as a JavaScript developer."
      },
      {
        question: "How do we stop a loop from from repeating indefinitely?",
        answers: {
          a: "A loop will stop executing when the condition is true.",
          b: "We have to explicitly end the loop with the break keyword.",
          c: "A loop will stop executing when the condition is false.",
          d: "When we have iterated through half of the condition."
        },
        correctAnswer: "c",
        feedback: "Fantastic! In JavaScript a loop will stop executing when the condition is false. Have a look at the documentation to solidify your knowledge of loops."
      },
      {
        question: "Which statement below is not true about functions in JavaScript?",
        answers: {
          a: "Functions can be reused throughout your code",
          b: "A function must always be assigned an identifier",
          c: "Functions can receive arguments that can alter the output of a function",
          d: "Functions are able to be recursive"
        },
        correctAnswer: "b",
        feedback: "You're doing great! Functions without identifiers are called anonymous functions which are used quite frequently used in JavaScript. Make sure you are familiar with functions and how they work."
      },
      {
        question: "What are the two types of scope JavaScript uses?",
        answers: {
          a: "Outside and Inside",
          b: "Surrounding and Inner",
          c: "Abroad and Local",
          d: "Global and Local"
        },
        correctAnswer: "d",
        feedback: "Nice job! JavaScript has two forms of scope, global and local. Have a look at the documentation on scope because it is something that will continuously during your JavaScript journey."
      },
      {
        question: "As a developer, I want to be able to remove the last element of my array and I want to also be able to add a new element to the beginning of my array. Which two array methods should I use?",
        answers: {
          a: "concat() and shift()",
          b: "forEach() and pop()",
          c: "pop() and unshift()",
          d: "push() and sort()"
        },
        correctAnswer: "c",
        feedback: "Awesome! The pop array method removes the last element of an array and the unshift method adds an element to beginning of the array."
      },
      {
        question: "How do we access a value stored in an object?",
        answers: {
          a: "Period notation, Square bracket notation",
          b: "Dot notation, Bracket notation",
          c: "Dot notation, Curl bracket notation",
          d: "Equal notation, Abstract notation"
        },
        correctAnswer: "b",
        feedback: "Stellar job! We have two ways of accessing data inside of an object, dot notation and bracket notation. Have a look at the documentation to better understand the behavior of objects."
      }
  ];