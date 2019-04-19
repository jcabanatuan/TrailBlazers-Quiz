'use strict';

////Questions and Answer options
const questionSet = [
  {
    number: 1,
    text: `Which player tweeted the following iconic phrase, "Im trying Jennifer"`,
    ans1: `Sauce Castillo`,
    ans2: `Jusuf Nurkic`,
    ans3: `CJ McCollum`,
    ans4: `Moe Harkless`
  },

  {
    number: 2,
    text: `Who is by far the most talented, basketball playing Leonard in Portland?`,
    ans1: `Elle Leonard`,
    ans2: `Elle's husband, Meyer Leonard of course`,
    ans3: `"Chilly" Leonard, the famous basketball playing teacup pig from Goose Hollow.`,
    ans4: `^^^ it feels like you just made that last one up.`
  },

  {
    number: 3,
    text: `Which Curry is the best Curry?`,
    ans1: `Green Basil, extra spicy, with a garlic naan.`,
    ans2: `Panang, drizzled with lime.`,
    ans3: `Seth "44 percent from three" Curry`,
    ans4: `Steven Curry (or however you spell it, I'm not really sure.)`
  },
  {
    number: 4,
    text: `Which one of these fashion "trail blazers" popularized the "three piece suit with no shirt" look?`,
    ans1: `CJ "Young Cabanatuan" McCollum`,
    ans2: `Evan "Big Cheese" Turner`,
    ans3: `Anfernee "Auntie Ann" Simmons`,
    ans4: `Damian "Logo" Lillard`
  },
  {
    number: 5,
    text: `Approximately how many seconds does it take to hit a game winning 3 ball against the Houston Rockets?`,
    ans1: `time is a flat circle`,
    ans2: `Somewhere between 1 and 5 seconds`,
    ans3: `It depends. Is Dwight Howard on the opposing team?`,
    ans4: `0.9 seconds exactly`
  },

  {
    number: 6,
    text: `What is Evan Turner's middle name?`,
    ans1: `Bartholomew`,
    ans2: `Even.`,
    ans3: `Midrange`,
    ans4: `Elizabeth`
  }

];

//correct answers
const ANSWERS = [
  `CJ McCollum`,
  `Elle Leonard`,
  `Seth "44 percent from three" Curry`,
  `Damian "Logo" Lillard`,
  `0.9 seconds exactly`,
  `Midrange`,
];

//feedback to display
const answerFeedback = [
  {
    number: 1,
    correctResultLink: 'IMG/Jennifer.jpg',
    correctResultAlt: 'CJ McCollum Im trying Jennifer Tweet',
    incorrectResultLink: 'IMG/Greg-Oden.jpeg',
    incorrectResultAlt:'Greg Oden Injured',
  },
  {
    number: 2,
    correctResultLink: 'IMG/Elle-Leonard.jpeg',
    correctResultAlt:'Elle Leonard hitting two shots at once',
    incorrectResultLink: 'IMG/Meyers-Leonard.jpeg',
    incorrectResultAlt:'Meyers Leonard in Sunglasses',
  },
  {
    number: 3,
    correctResultLink: 'IMG/Seth-Curry.jpeg',
    correctResultAlt:'Seth Curry',
    incorrectResultLink: 'IMG/Steph-Curry.jpeg',
    incorrectResultAlt:'Steph Curry',
  },
  {
    number: 4,
    correctResultLink: 'IMG/logo-lillard.jpeg',
    correctResultAlt:'Logo lillard image',
    incorrectResultLink: 'IMG/B-Roy.jpeg',
    incorrectResultAlt:'Brandon Roy',
  },
  {
    number: 5,
    correctResultLink: 'https://media.giphy.com/media/l0MYrguDYf6uvscak/giphy.gif',
    correctResultAlt:'Damian Lillard doing a shimmy',
    incorrectResultLink: 'https://media.giphy.com/media/2iqIYGZrk6Y0MZq5LA/giphy.gif',
    incorrectResultAlt:'Unhappy Damian Lillard',
  },
  {
    number: 6,
    correctResultLink: 'https://media.giphy.com/media/FepdjctvVgytTDWp7G/giphy.gif',
    correctResultAlt:'Evan Turner in a fly coat',
    incorrectResultLink: 'https://media.giphy.com/media/eeGfysElYIxVfhNlQE/giphy.gif',
    incorrectResultAlt:'Evan Turner signing the camera',
  }

];

let questionNum = 1;

let correctAnswers = 0;
//how to display questions and options to the user
function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>

    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>

        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/6</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}
//what happens when you click the start button
function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}
//when the user clicks Submit, check answer, generate feedback
function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}
//After displaying feedback, check if there are remaining questions.
function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {
    let finalQuestion = questionSet.length;
    if(questionNum === finalQuestion) {
      showResultsPage(correctAnswers);
    } else {
      countQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    countQuestion();
  });
}
//display next question.
function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}
//See if user selection matches answerset
function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}


//show correct feedback if answer is correct
function generateCorrectFeedback() {
  $('#container').html(correctFeedbackTemplate(questionNum));
  countCorrectAnswers();
}

function correctFeedbackTemplate(){
  return `
  <section class="feedback-page" role="main">
    <h2>Let's Go!!!!</h2>
    <img src="${answerFeedback[questionNum - 1].correctResultLink}" alt="${answerFeedback[questionNum - 1].correctResultAlt}">
    <button id="js-next-button">Next</button>
  </section>
`;
}
//show feedback if question is wrong.
function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Wrong! It was ${ANSWERS[questionNum - 1]}!</h2>
      <img src="${answerFeedback[questionNum - 1].incorrectResultLink}" alt="${answerFeedback[questionNum - 1].incorrectResultAlt}">
      <button id="js-next-button">Next</button>
    </section>
`;
}
//keep track of the qustion we are on
function countQuestion() {
  questionNum++;
}
//keep track of how many questions are correct.
function countCorrectAnswers() {
  correctAnswers++;
}
//When the quiz is done, display feedback based on number of questions that are correct.
function showResultsPage(correctAnswers) {
  if (correctAnswers>=3){
    $('#container').html(`
      <section id="final-page">
        <h2>Suit up. You my friend, are a Blazers legend.</h2>
        <img src="https://media.giphy.com/media/7J7lGgDKTpycRkdK6x/source.gif" alt="damian lillard and cj mcCollum dancing" class="final-image">
        <h2>Final Score: ${correctAnswers} out of 6</h2>
        <button id="js-restart-button">Play Again?</button>
      </section>
  `)}
  else{
    $('#container').html(`
      <section id="final-page">
        <h2>Back to the bench young blood.</h2>
        <img src="https://media.giphy.com/media/3o7TKSmi9uldiIVEAM/giphy.gif" alt="Sad Damian Lillard" class="final-image">
        <h2>Final Score: ${correctAnswers} out of 6</h2>
        <button id="js-restart-button">Play Again?</button>
      </section>
  `)}
  ;
}
//callback functions
function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
