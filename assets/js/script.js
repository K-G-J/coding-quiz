var quizQuestionsContainer = document.getElementById("quiz");
var quizQuestion = document.getElementById("quiz-question");
var buttonsContainer = document.getElementById("buttons-container");
var startButton = document.getElementById("start");
var questionCounter = 0;

startButton.addEventListener("click", function() {
  buttonsContainer.removeChild(startButton);
  quizQuestions.removeChild
  displayQuestion();
});

var displayQuestion = function () {
      let currentQuestion = quizQuestions[questionCounter]; 
  
      for (letter in currentQuestion.answers) {
        var optionButton = document.createElement("button")
        optionButton.id = "option-button"
        optionButton.textContent = currentQuestion.answers[letter];
        buttonsContainer.appendChild(optionButton);
      }
    quizQuestion.innerText = currentQuestion.question
    questionCounter += 1;
  };


// quiz questions 
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
          d: "Functions are able to be recursive."
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