const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async () => {
    const message = userInput.value;
    if (!message) return;

    appendMessage(`Vous: ${message}`);
    userInput.value = '';

    const response = await getResponseFromAPI(message);
    appendMessage(`Bot: ${response}`);
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

async function getResponseFromAPI(message) {
    const apiKey = 'AhiynwvjxaZWrmHB7m2H70sTA3iD1Hu4'; // Remplacez ceci par votre clé API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // ou un autre modèle
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
