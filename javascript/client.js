const socket = io('http://localhost:5502');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const audio = new Audio('ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position);
  messageContainer.append(messageElement);
  if (position === 'left') audio.play();
};

const name = prompt('Enter your name to join:');
socket.emit('new-user-join', name);

socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
  append(`${name} left the chat`, 'center');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});
