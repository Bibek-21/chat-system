
const myName = document.getElementById("myname")
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const Name = document.getElementById("userDropdown")

//adding message to UI when the user send the data or receives the data from
// the server
const socket = io('http://localhost:3000',)

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
socket.emit('register',myName.value);

function sendMessage() {            // sending message toserver and adding to ui
  if (messageInput.value === '') return

  const data = {
    myName: myName.value,         //this is personwho is sending the message
    userName: Name.value,         //this is person selected in dropdown
    message: messageInput.value,  //message that has been typedin the message box
    dateTime: new Date().toDateString()
  };
  console.log(data.userName);
  socket.emit('private_message', data);
  console.log("sending from client to server");
  addMessageToUI(true, data);

  messageInput.value = ''
  return
}


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
})
console.log(messageInput.value);

/*Received private messages*/
socket.on('private_chat', function (data) {
  var username = data.username;
  var message = data.message;
  console.log("receiving from server to client");
  addMessageToUI(false, message)
});

