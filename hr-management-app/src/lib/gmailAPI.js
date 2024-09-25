// src/lib/gmailAPI.js
require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials.
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/**
 * Get and store new token after prompting for user authorization.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 */
async function getAccessToken(oauth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  // Open the URL in the browser and get the authorization code from the redirect URI
  const code = await new Promise((resolve) => {
    console.log('Enter the code from that page here:');
    process.stdin.on('data', (data) => {
      resolve(data.toString().trim());
    });
  });

  return new Promise((resolve, reject) => {
    oauth2Client.getToken(code, (err, tokens) => {
      if (err) {
        reject(err);
      } else {
        oauth2Client.setCredentials(tokens);
        fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
          if (err) reject(err);
          console.log('Token stored to', TOKEN_PATH);
          resolve(oauth2Client);
        });
      }
    });
  });
}

/**
 * Load or request authorization to call Gmail API.
 */
async function authorize() {
  try {
    const token = await fs.promises.readFile(TOKEN_PATH);
    oauth2Client.setCredentials(JSON.parse(token));
  } catch (err) {
    await getAccessToken(oauth2Client);
  }
  return oauth2Client;
}

/**
 * Fetch emails from Gmail.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function fetchEmails(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({
    userId: 'me',
    labelIds: ['INBOX'],
  });

  const messages = res.data.messages;
  if (!messages) {
    console.log('No messages found.');
    return;
  }

  const emails = await Promise.all(
    messages.map(async (message) => {
      const messageRes = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });
      return messageRes.data;
    })
  );

  return emails;
}

/**
 * Main function to run the Gmail API integration.
 */
async function run() {
  try {
    const auth = await authorize();
    const emails = await fetchEmails(auth);
    console.log('Emails:', emails);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the main function
run();