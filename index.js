const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const axios = require('axios'); // To send a message back to Facebook Messenger

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


const VERIFY_TOKEN = '';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || ''; // Add your page access token here

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post('/webhook', (req, res) => {
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach((entry) => {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;
      const message = webhook_event.message.text;
      console.log('Received message: ', message);

      // Call Python script to get response from Gemini API
      const pythonProcess = spawn('python', ['script.py', message]);

      pythonProcess.stdout.on('data', (data) => {
        const responseMessage = data.toString();
        console.log('Response from Gemini API: ', responseMessage);

        // Now send the response back to the user on Facebook Messenger
        sendMessage(sender_psid, responseMessage);
      });

      pythonProcess.stderr.on('data', (error) => {
        console.error('Python Error: ', error.toString());
      });
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to send a message back to the user via Messenger API
function sendMessage(sender_psid, response) {
  const request_body = {
    recipient: {
      id: sender_psid
    },
    message: {
      text: response
    }
  };

  axios({
    url: `https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
    method: 'POST',
    data: request_body
  })
    .then(() => {
      console.log('Message sent!');
    })
    .catch((error) => {
      console.error('Unable to send message:', error.response ? error.response.data : error.message);
    });
}
