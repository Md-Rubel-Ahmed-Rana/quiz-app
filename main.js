// questions array
const questions = [
  {
    question: "What is JavaScript?",
    correctAnswer: "JavaScript is a programming language",
    answers: [
      "JavaScript is a database",
      "JavaScript is a server",
      "JavaScript is a programming language",
      "JavaScript is a text editor",
    ],
  },
  {
    question: "Which company developed JavaScript?",
    correctAnswer: "Netscape",
    answers: ["Microsoft", "Apple", "Google", "Netscape"],
  },
  {
    question: "What is the use of JavaScript in web development?",
    correctAnswer: "To add interactivity to web pages",
    answers: [
      "To style web pages",
      "To add interactivity to web pages",
      "To create server-side applications",
      "To manage databases",
    ],
  },
  {
    question: "Which of the following is a JavaScript framework?",
    correctAnswer: "Angular",
    answers: ["Django", "Laravel", "Spring", "Angular"],
  },
  {
    question: "How do you declare a variable in JavaScript?",
    correctAnswer: "Using var, let, or const",
    answers: ["Using def", "Using int", "Using var, let, or const", "Using $"],
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    correctAnswer: "//",
    answers: ["#", "//", "/* */", "<!-- -->"],
  },
  {
    question: "What is the output of 'typeof null' in JavaScript?",
    correctAnswer: "object",
    answers: ["null", "undefined", "object", "function"],
  },
  {
    question:
      "Which method is used to add an element to the end of an array in JavaScript?",
    correctAnswer: "push()",
    answers: ["add()", "append()", "push()", "insert()"],
  },
  {
    question: "What does 'DOM' stand for in JavaScript?",
    correctAnswer: "Document Object Model",
    answers: [
      "Data Object Model",
      "Document Object Model",
      "Desktop Object Model",
      "Domain Object Model",
    ],
  },
  {
    question: "Which of the following is a looping structure in JavaScript?",
    correctAnswer: "for",
    answers: ["if", "while", "for", "switch"],
  },
];

// by default show first question
let startFromQuiz = 0;

// user selected answers
let selectedAnswers = [];
let currentAnswer = "";

// select all the necessary elements
// question
const question = document.getElementById("question");
// answer 1
const answer1Input = document.getElementById("answer1-input");
const answer1Label = document.getElementById("answer1-label");
// answer 2
const answer2Input = document.getElementById("answer2-input");
const answer2Label = document.getElementById("answer2-label");
// answer 3
const answer3Input = document.getElementById("answer3-input");
const answer3Label = document.getElementById("answer3-label");
// answer 4
const answer4Input = document.getElementById("answer4-input");
const answer4Label = document.getElementById("answer4-label");
// prev button
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");

// select score and quiz container
const scoreSection = document.getElementById("score-section");
const quizSection = document.getElementById("quiz-container");

// select element for score
const score = document.getElementById("score");
const totalQuiz = document.getElementById("total-quiz");
totalQuiz.innerHTML = questions.length;
const correctAns = document.getElementById("correct-ans");
const wrongAns = document.getElementById("wrong-ans");


// show quiz handler
const handleShowQuiz = (quizNumber) => {
  question.innerHTML = questions[quizNumber].question;

  answer1Input.value = questions[quizNumber].answers[0];
  answer1Label.innerHTML = questions[quizNumber].answers[0];
  answer1Input.checked = false;

  answer2Input.value = questions[quizNumber].answers[1];
  answer2Label.innerHTML = questions[quizNumber].answers[1];
  answer2Input.checked = false;

  answer3Input.value = questions[quizNumber].answers[2];
  answer3Label.innerHTML = questions[quizNumber].answers[2];
  answer3Input.checked = false;

  answer4Input.value = questions[quizNumber].answers[3];
  answer4Label.innerHTML = questions[quizNumber].answers[3];
  answer4Input.checked = false;
};

// next question show handler
const handleGoNextQuiz = () => {
  startFromQuiz++;
  prevButton.removeAttribute("disabled");
  handleDisablePrevButton();
  handleShowQuiz(startFromQuiz);
  currentAnswer = "";
  handleDisableNextButton();
  if (startFromQuiz === questions.length - 1) {
    handleShowSubmitButton();
  }
};

const handleBackPrevQuiz = () => {
  startFromQuiz--;
  handleDisablePrevButton();
  handleShowQuiz(startFromQuiz);
};

const handleDisablePrevButton = () => {
  if (startFromQuiz === 0) {
    prevButton.classList.add("disabled-button");
    prevButton.setAttribute("disabled", true);
  } else {
    prevButton.classList.remove("disabled-button");
  }
};

const handleDisableNextButton = () => {
  if (!currentAnswer) {
    nextButton.classList.add("disabled-button");
    nextButton.setAttribute("disabled", true);
  } else {
    nextButton.classList.remove("disabled-button");
    nextButton.removeAttribute("disabled");
  }
};

const handleShowSubmitButton = () => {
  nextButton.style.display = "none";
  submitButton.style.display = "block";
};

const handleSubmitQuiz = () => {
  quizSection.style.display = "none";
  scoreSection.style.display = "block";
  let countCorrect = 0;
  let countWrong = 0;
  questions.forEach((ques) => {
    if (selectedAnswers.includes(ques.correctAnswer)) {
      countCorrect++;
    } else {
      countWrong++;
    }
  });
  correctAns.innerHTML = countCorrect;
  wrongAns.innerHTML = countWrong;
  score.innerHTML = `${countCorrect * 10}%`;
};

const selectAnswer = (event) => {
  if (event.target.tagName === "LABEL") {
    currentAnswer = event.target.innerText;
  } else if (event.target.tagName === "INPUT") {
    const label = document.querySelector(`label[for=${event.target.id}]`);
    currentAnswer = label.innerText;
  }
  selectedAnswers[startFromQuiz] = currentAnswer;
  if (startFromQuiz === questions.length - 1) {
    submitButton.classList.remove("disabled-button");
    submitButton.removeAttribute("disabled");
  } else {
    nextButton.classList.remove("disabled-button");
    nextButton.removeAttribute("disabled");
  }
};

const handleRestartQuiz = () => {
  startFromQuiz = 0;
  selectedAnswers = [];
  currentAnswer = "";
  handleShowQuiz(0);
  quizSection.style.display = "block";
  scoreSection.style.display = "none";
  submitButton.style.display = "none";
  nextButton.style.display = "block";
  handleDisablePrevButton();
  handleDisableNextButton();
  const inputs = document.getElementsByTagName("input");
  for (const input in inputs) {
    const inputElement = inputs[input];
    inputElement.checked = false;
  }
};

handleDisablePrevButton();
handleDisableNextButton();
handleShowQuiz(startFromQuiz);
