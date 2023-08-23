// const socket = io("http:localhost:3000",{});

const socket = io('http://localhost:3000', {})


const clientNumber = document.getElementById("client-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");



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


function sendMessage() {
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


socket.on('clients-total', (data) => {
    clientNumber.innerText = `Clients-Total:${data}`;
})


socket.on('chatMessage', (data) => {
    // console.log("i am here bro am i ?");
    // console.log(data);
    addMessageToUI(false, data)

})







