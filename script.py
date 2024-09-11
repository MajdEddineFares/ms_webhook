import sys
import requests
import json

# Get the message from Node.js
message = sys.argv[1]

# Your API key
API_KEY = ''
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={API_KEY}"

# Set up the payload for the Gemini API request
payload = {
    "prompt": {
        "text": message
    }
}

headers = {
    "Content-Type": "application/json"
}

# Send the request to the Gemini API
response = requests.post(url, headers=headers, data=json.dumps(payload))

# Check if the request was successful
if response.status_code == 200:
    result = response.json()
    generated_content = result.get("content", "Sorry, I couldn't generate a response.")
else:
    generated_content = "Error: Unable to get a response from Gemini API."

# Print the generated content to be captured by Node.js
print(generated_content)
