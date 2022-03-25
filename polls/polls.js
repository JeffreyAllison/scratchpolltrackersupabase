import { createPoll, getPolls, logout } from '../fetch-utils.js';
import { renderPoll } from '../render-utils.js';

const currentPollContainerEl = document.querySelector('.current-poll-container');
const pastPollsEl = document.querySelector('.previous-polls-container');
const logoutButton = document.querySelector('.logout');

const formEl = document.querySelector('form');

const option1AddVoteButton = document.querySelector('.option-1-add-vote');
const option1MinusVoteButton = document.querySelector('.option-1-minus-vote');
const option2AddVoteButton = document.querySelector('.option-2-add-vote');
const option2MinusVoteButton = document.querySelector('.option-2-minus-vote');
const endPollingButton = document.querySelector('.end-poll');
//const voteButtons = document.querySelector('.vote-buttons-container');

//const currentQuestionEl = document.querySelector('.current-question-text');
//const currentOption1El = document.querySelector('.option-1-text');
//const currentOption2El = document.querySelector('.option-2-text');

//const optionOneLabel = document.getElementById('option-1-name');
//const optionTwoLabel = document.getElementById('option-2-name');
//const questionLabel = document.getElementById('question-name');

let currentPollQuestion = '';
let currentOption1 = '';
let currentOption2 = '';
let currentVote1 = 0;
let currentVote2 = 0;

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(formEl);

  currentPollQuestion = data.get('question-name');
  currentOption1 = data.get('option-1-name');
  currentOption2 = data.get('option-2-name');

  //questionLabel.textContent = currentPollQuestion;
  //optionOneLabel.textContent = currentOption1;
  //optionTwoLabel.textContent = currentOption2;

  formEl.reset();

  displayCurrentQuestion();
});

option1AddVoteButton.addEventListener('click', () => {
  currentVote1++;

  displayCurrentQuestion();
});

option2AddVoteButton.addEventListener('click', () => {
  currentVote2++;

  displayCurrentQuestion();
});

option1MinusVoteButton.addEventListener('click', () => {
  currentVote1--;

  displayCurrentQuestion();
});

option2MinusVoteButton.addEventListener('click', () => {
  currentVote2--;

  displayCurrentQuestion();
});

endPollingButton.addEventListener('click', async () => {
  const pastPoll = {
    question: currentPollQuestion,
    option1: currentOption1,
    option2: currentOption2,
    votes1: currentVote1,
    votes2: currentVote2,
  };

  await createPoll(pastPoll);

  await fetchAndDisplayPolls();
  currentPollQuestion = 'Poll Question';
  currentOption1 = 'Option 1';
  currentOption2 = 'Option 2';
  currentVote1 = 0;
  currentVote2 = 0;

  displayCurrentQuestion();
});

logoutButton.addEventListener('click', async () => {
  await logout();

  window.location.href = '../';
});

window.addEventListener('load', async () => {
  await fetchAndDisplayPolls();
});

function displayCurrentQuestion () {

  currentPollContainerEl.textContent = '';

  //questionLabel.textContent = currentPollQuestion;
  //optionOneLabel.textContent = currentOption1;
  //optionTwoLabel.textContent = currentOption2;

  const pastPoll = {
    question: currentPollQuestion,
    option1: currentOption1,
    option2: currentOption2,
    votes1: currentVote1,
    votes2: currentVote2,
  };

  const pollEl = renderPoll(pastPoll);

  currentPollContainerEl.append(pollEl);
}

async function fetchAndDisplayPolls () {

  pastPollsEl.textContent = '';

  const polls = await getPolls();

  for (let poll of polls) {
    const pollEl = renderPoll(poll);

    pastPollsEl.append(pollEl);
  }
}

displayCurrentQuestion;