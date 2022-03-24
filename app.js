import { signUp, logIn, getUser } from './fetch-utils.js';

const signUpForm = document.querySelector('.sign-up');

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(signUpForm);

  await signUp(data.get('email'), data.get('password'));

  const user = getUser();

  if (user) {
    window.location.href = './polls';
  }
});

const logInForm = document.querySelector('.log-in');

logInForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(logInForm);

  await logIn(data.get('email'), data.get('password'));

  const user = getUser();

  if (user) {
    window.location.href = './polls';
  }

});