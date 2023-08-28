
const socket = io('http://localhost:3000/api-v1/login/loginuser', {})

document.cookie = `token=${token}; HttpOnly`

const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");


//adding message to UI when the user send the data or receives the data from
// the server
function addMessageToUI(isOwnMessage, data) {           

    const element = ` 
    <li class="${isOwnMessage ? "message-right" : "message-left"}">
        <p class="message">
            ${data.message}
            <span> ${data.name} ● ${data.dateTime}
            </span>
        </p>
    </li>`

    messageContainer.innerHTML += element;

}


function sendMessage() {            // sending message toserver and adding to ui
    if (messageInput.value === '') return

    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date().toDateString()
    };

    socket.emit('message', data);
    addMessageToUI(true, data);

    messageInput.value = ''

}


messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})





socket.on('chatMessage', (data) => {
    // console.log("i am here bro am i ?");
    // console.log(data);
    addMessageToUI(false, data)

})



// const socket = io('http://your-server.com', {
//   // No need to send the token here, it will be sent automatically with cookies
// });

// // Example: Sending a message to the server
// const message = "Hello, Server!";
// socket.emit('message', message);







