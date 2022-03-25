const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYnpocGxkanJ4cWtqc2tjaXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTIwMDMsImV4cCI6MTk2MzEyODAwM30.idE1m2ehmckSIic7mOSaXFl1McMzBdIrhU_Vrsr6UyI';

const SUPABASE_URL = 'https://lrbzhpldjrxqkjskcizc.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createPoll (pastPoll) {
  const response = await client
    .from('past_polls')
    .insert(pastPoll);

  return response.body;
}

export async function getPolls () {
  const response = await client
    .from('past_polls')
    .select('*');

  return response.body;
}

export function getUser () {
  return client.auth.session();
}

export async function checkAuth () {
  const user = await getUser();

  if (!user) location.replace('../');
}

export async function signUp (randomEmail, randomPassword) {
  const response = await client.auth.signUp({
    email: randomEmail,
    password: randomPassword,

  });
  return response;
}

export async function logIn (randomEmail, randomPassword) {
  const response = await client.auth.signIn({
    email: randomEmail,
    password: randomPassword,

  });
  return response;
}

export async function logout () {
  await client.auth.signOut();
}
