'user server'
/*
actions/auth.ts (Server Actions)
This file handles user-triggered events that interact with your database, like your new Sign-Up flow. 
Purpose: To house "Server Actions." These are functions called directly from your forms.
Why separate? Registration (creating a new user) is a custom database operation, whereas auth.ts is strictly for authenticating (logging in) existing users.
Example: Your signup function lives here because it needs to hash passwords and save data to your database before redirecting the user.
*/

