const socket = io();
let username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

// Open the authentication modal
window.onload = function () {
    authModal.style.display = "block";
}

// Close the authentication modal
document.querySelector('.close').addEventListener('click', function () {
    authModal.style.display = "none";
});

// Authenticate user
authButton.addEventListener('click', function () {
    username = usernameInput.value.trim();
    if (username !== "") {
        authModal.style.display = "none";
        document.querySelector('.brand h1').innerText = username; // Update the brand name with the entered username
    } else {
        alert("Please enter your name.");
    }
});

// Send message when user presses Enter
textarea.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send message when user clicks send button
document.getElementById('sendButton').addEventListener('click', function () {
    sendMessage();
});

// Function to send message
function sendMessage() {
    let message = textarea.value.trim();
    if (message !== "") {
        let msg = {
            user: username,
            message: message
        };
        appendMessage(msg, 'outgoing');
        textarea.value = '';
        scrollToBottom();
        socket.emit('message', msg);
    } else {
        alert("Please enter a message.");
    }
}

// Function to append message to chat area
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('message', type);

    let messageContent = `
    <div class="message-content">
        <p class="username">${msg.user}</p>
        <p class="message-text">${msg.message}</p>
    </div>
    `;

    mainDiv.innerHTML = messageContent;
    messageArea.appendChild(mainDiv);
    scrollToBottom();
}

// Scroll to bottom of chat area
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Listen for incoming messages from server
socket.on('message', function (msg) {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});
// Inside the function where you display messages on the screen
function displayMessage(message) { 
    // ... other message display logic
  
    // Hide username if it belongs to the current user (the sender)
    if (message.username === senderUsername) { 
      messageDiv.querySelector('.username').style.display = 'none';  
    }
  }
  