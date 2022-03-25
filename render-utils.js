export function renderPoll (poll) {
  const pollDiv = document.createElement('div');
  const questionEl = document.createElement('h4');
  const option1El = document.createElement('h5');
  const vote1El = document.createElement('p');
  const option2El = document.createElement('h5');
  const vote2El = document.createElement('p');

  questionEl.textContent = poll.question;
  option1El.textContent = poll.option1;
  vote1El.textContent = poll.votes1;
  option2El.textContent = poll.option2;
  vote2El.textContent = poll.votes2;


  pollDiv.append(questionEl, option1El, vote1El, option2El, vote2El);

  pollDiv.classList.add('poll');

  return pollDiv;
}