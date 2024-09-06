const { GoogleAuth } = require('google-auth-library');

async function generateToken () {
  try {
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });

    // Acquire an auth client, and bind it to all future calls
    const client = await auth.getClient();

    // The client will be authorized with the necessary credentials
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
  }
};

module.exports = generateToken;
