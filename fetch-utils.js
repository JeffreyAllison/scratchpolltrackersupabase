const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYnpocGxkanJ4cWtqc2tjaXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTIwMDMsImV4cCI6MTk2MzEyODAwM30.idE1m2ehmckSIic7mOSaXFl1McMzBdIrhU_Vrsr6UyI';

const SUPABASE_URL = 'https://lrbzhpldjrxqkjskcizc.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function signUp (randomEmail, randomPassword) {
  const response = await client.auth.signUp({
    email: randomEmail,
    password: randomPassword,

  });
  return response;
}

export async function logIn (randomEmail, randomPassword) {
  const response = await client.auth.logIn({
    email: randomEmail,
    password: randomPassword,

  });
  return response;
}

export function getUser () {
  const user = client.auth.user();

  return user;
}

export async function logout () {
  await client.auth.signOut();
}

export function redirectIfNotLoggedIn () {
  const user = getUser();

  if (!user) {
    window.location.href = '../';
  }
}
