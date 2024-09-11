const axios = require('axios');

// Replace with your Page Access Token and the recipient's PSID
const PAGE_ACCESS_TOKEN = '';
const RECIPIENT_PSID = ''; // Page-scoped User ID

// Function to send a message
async function sendMessage(recipientId, messageText) {
  try {
    const response = await axios({
      url: `https://graph.facebook.com/v12.0/me/messages`,
      method: 'POST',
      params: {
        access_token: PAGE_ACCESS_TOKEN()
      },
      data: {
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText
        }
      }
    });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Unable to send message:', error.response ? error.response.data : error.message);

  }
}

// Call the function with the recipient's PSID and the message you want to send
sendMessage(RECIPIENT_PSID, 'Hello, this is a test message!');
