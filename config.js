const supabaseUrl = 'https://oigwfuzwyxyqpltmjxif.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pZ3dmdXp3eXh5cXBsdG1qeGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzY2MTUsImV4cCI6MjA3NjcxMjYxNX0.RD48P9BT8fZJ77KCqKwkfGZmkaBKOE1XO8RMlg6-h20';

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);
console.log(createClient);
console.log(client);

export default client;


