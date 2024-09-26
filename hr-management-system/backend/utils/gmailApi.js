// backend/utils/gmailApi.js
const { google } = require('googleapis');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';

async function authorize() {
  // Load client secrets from a JSON file
  const content = fs.readFileSync('credentials.json');
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
  } else {
    console.log('Please authorize this app by visiting this url:', oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    }));
  }

  return oAuth2Client;
}

async function fetchEmails() {
  const auth = await authorize();
  const gmail = google.gmail({ version: 'v1', auth });

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'subject:Job Application',
  });

  const messages = res.data.messages;
  const emails = [];

  for (const message of messages) {
    const email = await gmail.users.messages.get({
      userId: 'me',
      id: message.id,
    });

    emails.push(email.data);
  }

  return emails;
}

module.exports = { fetchEmails };