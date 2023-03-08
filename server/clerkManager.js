// Import the Clerk SDK
const { Clerk } = require('@clerk/clerk-sdk-node');

// Create a new Clerk instance
const clerk = new Clerk({
  apiKey: 'sk_test_aj6vfe4ZovgjYM4TCvDyBc5vLAbo2iYBZR0z4LkreI',
  frontendApi: 'https://api.clerk.dev',
});

// Retrieve the user ID of the logged-in user
async function getUserId() {
  const user = await clerk.session.load();
  if (user.isAuthenticated) {
    return user.id;
  }
  // User is not authenticated
  return null;
}

module.exports = getUserId
