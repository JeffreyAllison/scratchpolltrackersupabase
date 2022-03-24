const currentPollContainerEl = document.querySelector('.current-poll-container');
const beginPollingButton = document.querySelector('.begin-poll');
const pastPollsEl = document.querySelector('.previous-polls-list');
const currentQuestionEl = document.querySelector('.current-question-text');
const currentOption1El = document.querySelector('.option-1-text');
const currentOption2El = document.querySelector('.option-2-text');
const formEl = document.querySelector('form');

let currentPollQuestion = '';
let currentOption1 = '';
let currentOption2 = '';
let currentVote1 = '';
let currentVote2 = '';

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(formEl);

  currentPollQuestion = data.get('question');
  currentOption1 = data.get('option1');
  currentOption2 = data.get('option2');

  currentQuestionEl.textContent = currentPollQuestion;
  currentOption1El.textContent = currentOption1;
  currentOption2El.textContent = currentOption2;

  formEl.reset();
});