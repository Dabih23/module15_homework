const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const locationButton = document.getElementById('location-button');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  sendMessage(message);
  const chatWindow = document.getElementById('chat-window');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.classList.add('sent');
  chatWindow.appendChild(messageElement);
  messageInput.value = '';
})

socket.addEventListener('open', (event) => {
    console.log('Соединение установлено');
  });
  
socket.addEventListener('message', (event) => {
  console.log('Получено сообщение:', event.data);
  if (!event.data.startsWith('https://www.openstreetmap.org/')) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.textContent = event.data;
    messageElement.classList.add('received');
    chatWindow.appendChild(messageElement);
   }
});

socket.addEventListener('close', (event) => {
  console.log('Соединение закрыто');
});

function sendMessage(message) {
  socket.send(message);
}

locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const mapUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        sendMessage(mapUrl);
        const messageElement = document.createElement('div');
        const linkElement = document.createElement('a');
        linkElement.href = mapUrl;
        linkElement.textContent = 'Геолокация';
        messageElement.appendChild(linkElement);
        messageElement.classList.add('sent');
        chatWindow.appendChild(messageElement);
      });
    } else {
      alert('Ваш браузер не поддерживает геолокацию');
    }
  });