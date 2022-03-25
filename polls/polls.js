import { createPoll, getPolls, logout, redirectIfNotLoggedIn } from '../fetch-utils';

const currentPollContainerEl = document.querySelector('.current-poll-container');
const beginPollingButton = document.querySelector('.begin-poll');
const pastPollsEl = document.querySelector('.previous-polls-list');
const currentQuestionEl = document.querySelector('.current-question-text');
const currentOption1El = document.querySelector('.option-1-text');
const currentOption2El = document.querySelector('.option-2-text');
const option1AddVoteButton = document.querySelector('.option-1-add-vote');
const option1MinusVoteButton = document.querySelector('.option-1-minus-vote');
const option2AddVoteButton = document.querySelector('.option-2-add-vote');
const option2MinusVoteButton = document.querySelector('.option-2-minus-vote');
const formEl = document.querySelector('form');
const logoutButton = document.querySelector('.logout');

let currentPollQuestion = '';
let currentOption1 = '';
let currentOption2 = '';
let currentVote1 = '';
let currentVote2 = '';

redirectIfNotLoggedIn();

logoutButton.addEventListener('click', async () => {
  await logout();

  window.location.href = '../';
});

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(formEl);

  currentPollQuestion = data.get('question');
  currentOption1 = data.get('option1');
  currentOption2 = data.get('option2');

  displayCurrentQuestion();

  formEl.reset();
});

option1AddVoteButton.addEventListener('click', () => {
  currentVote1++;
  currentOption1.textContent = `${currentOption1} (${currentVote1})`;
});

option2AddVoteButton.addEventListener('click', () => {
  currentVote2++;
  currentOption2.textContent = `${currentOption2} (${currentVote2})`;
});

option1MinusVoteButton.addEventListener('click', () => {
  currentVote1--;
  currentOption1.textContent = `${currentOption1} (${currentVote1})`;
});

option2MinusVoteButton.addEventListener('click', () => {
  currentVote2--;
  currentOption2.textContent = `${currentOption2} (${currentVote2})`;
});

beginPollingButton.addEventListener('click', async () => {

  const pastPoll = {
    question: currentPollQuestion,
    option1: currentOption1,
    option2: currentOption2,
    votes1: currentVote1,
    votes2: currentVote2,
  };
  await createPoll(pastPoll);

  await fetchAndDisplayPolls();
  currentPollQuestion = '';
  currentOption1 = '';
  currentOption2 = '';
  currentVote1 = 0;
  currentVote2 = 0;

  displayCurrentQuestion();
});

window.addEventListener('load', async () => {
  await fetchAndDisplayPolls();

});

function displayCurrentQuestion () {
  currentQuestionEl.textContent = currentPollQuestion;
  currentOption1El.textContent = currentOption1;
  currentOption2El.textContent = currentOption2;
}

async function fetchAndDisplayPolls () {
  const polls = await getPolls();

  pastPollsEl.textContent = '';
  for (let poll of polls) {
    const pollEl = document.createElement('div');

    pollEl.textContent = JSON.stringify(poll);

    pastPollsEl.append(pollEl);
  }
}