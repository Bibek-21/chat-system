

const express = require('express');
const bodyParser = require('body-parser');
const mysqlHelper = require('./helper/mysqlhelper');
const cors = require('cors'); // Import the cors module
const app = express();
app.use(express.json());

const mainroute = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // Use the cors middleware to enable CORS

app.use("/api-v1", mainroute);
const port = process.env.PORT;

app.listen(port, () => {
    mysqlHelper.init();
    console.log(`Server running on '${port}'`);
})


function tokenValid () {
let socketConnected = new Set();

function onconnection(socket) {
    console.log(socket.id);

    socketConnected.add(socket.id)

    io.emit('clients-total', socketConnected.size)

    socket.on('disconnect', () => {     //perform for logout 
        console.log('socket disconnected ', socket.id);
        socketConnected.delete(socket.id);
        io.emit('clients-total', socketConnected.size);

    })

    socket.on('message', (data) => {
        socket.broadcast.emit('chatMessage', data);
        console.log(data);
    })

    // socket.on('feedback', (data) => {
    //     socket.broadcast.emit('feedback', data);
    //     // console.log(data);
    // })
}



io.on('connection', onconnection);
}
