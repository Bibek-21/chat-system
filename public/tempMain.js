
const myName = document.getElementById("myname")
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const receiver = document.getElementById("userDropdown");

const startChatBtn = document.getElementById('startChatBtn');
const userDropdown = document.getElementById('userDropdown1');


//adding message to UI when the user send the data or receives the data from
// the server
const socket = io('http://localhost:3000',)     //Connect socket.io     


localStorage.setItem('token', loggedInUser.token);


// Example client-side code using fetch
const token = localStorage.getItem(token);
const message = /* Get the message to send */ messageInput.value;

fetch('/api-v1/chat/send-message', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
})
.then(response => {
    if (response.ok) {
        // Message sent successfully
    } else {
        // Handle error
    }
})
.catch(error => {
    // Handle error
});





















//Collect User identity from the client side
var sender = myName.value;
console.log(sender);
socket.emit('register',sender);

function addMessageToUI(isOwnMessage,sender, data) {
  let value = isOwnMessage ? 'message-right' : 'message-left'
  console.log(value)
  const element = ` 
    <li class="${value}">
        <p class="message">
            ${data.message}
            <span> ${sender} ● ${data.dateTime}
            </span>
        </p>
    </li>
    
    `

  messageContainer.innerHTML += element;
  return
}
socket.emit('register',myName.value);

function sendMessage() {   

  // sending message toserver and adding to ui
  if (messageInput.value === '') return

  const data = {
    sender: myName.value,         //this is personwho is sending the message
    to: receiver.value,         //this is person selected in dropdown
    message: messageInput.value,  //message that has been typedin the message box
    dateTime: new Date().toDateString()
  };
  socket.emit('private_message', data);
  console.log("sending from client to server");
  addMessageToUI(true,data.sender, data);

  messageInput.value = ''
  return
}


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
})

startChatBtn.addEventListener('click', () => {
  const selectedUser = userDropdown.value;
  if (selectedUser) {
      // Redirect to main chat page with selected user
      window.location.href = `main_chat_page.html?user=${selectedUser}`;
  }
});

/*Received private messages*/
socket.on('private_message', function (data) {
  var sender = data.sender;
  var message = data.message;
  console.log("receiving from server to client");
  addMessageToUI(false,sender, message)
});



