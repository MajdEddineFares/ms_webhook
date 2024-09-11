const axios = require('axios');

// Replace with your Page Access Token and the recipient's PSID
const PAGE_ACCESS_TOKEN = 'EAAPU64ObztsBOwI4CG0AAE8YLWSZBJlstSk9w6g3n3nx9N7FXOFbtJ4kW2zrjDltgThSn8bP9u02atWGdODtXMAwBkmTw5xJ2AjsRXZCoduxKurxRnyJI9jvXaZCee27aIioZCr7WQZC4x4buWmUXZB9ygQGApHwZCapi9cPNB4ybgHJm4tmowDZBYe5ZCiy63b063592jijcVZCiuMVT3RgZDZD';
const RECIPIENT_PSID = '118342752905676'; // Page-scoped User ID

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
