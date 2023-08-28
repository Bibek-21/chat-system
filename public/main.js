

const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

console.log(messageInput.value);

//adding message to UI when the user send the data or receives the data from
// the server
const socket = io('http://localhost:3000', )

function addMessageToUI(isOwnMessage, data) {      
    let value = isOwnMessage ? 'message-right' : 'message-left'
    console.log(value)
    const element = ` 
    <li class="${value}">
        <p class="message">
            ${data.message}
            <span>  ● ${data.dateTime}
            </span>
        </p>
    </li>
    
    `

    messageContainer.innerHTML += element;
    return
}

function sendMessage() {            // sending message toserver and adding to ui
    if (messageInput.value === '') return

    const data = {
        // name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date().toDateString()
    };

    socket.emit('message', data);
    addMessageToUI(true, data);

    messageInput.value = ''
    return
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})


socket.on('chat-message', (data) => {
    addMessageToUI(false, data)
})
