const currentPollContainerEl = document.querySelector('.current-poll-container');
const beginPollingButton = document.querySelector('.begin-poll');
const pastPollsEl = document.querySelector('.previous-polls-list');
const formEl = document.querySelector('form');

let currentPollQuestion = '';
let currentOption1 = '';
let currentOption2 = '';
let currentVote1 = '';
let currentVote2 = '';