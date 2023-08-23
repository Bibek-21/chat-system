

const express = require('express');
const bodyParser = require('body-parser');
const mysqlHelper = require('./helper/mysqlhelper');
const exphbr = require("express-handlebars")

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





 //Loads the handlebars module
app.engine('hbs', exphbr.engine({
    layoutsDir: __dirname + 'public/view/layouts',
    //new configuration parameter
    extname: 'hbs',
    defaultLayout: 'home',
    partialsDir: __dirname + 'public/view/partials/',
}));

app.set('view engine', 'hbs')     //Sets our app to use the handlebars engine

//Serves static files (we need it to import a css file)
app.use(express.static(__dirname + 'public'))
//Sets a basic route

// app.get('/', (req, res) => {
//     res.render('./main', {layout:'index' });
//     // res.render('./main');
// });

//Makes the app listen to port 3000

app.get('/', (req, res) => {
    res.render('./layouts/signup', {layout:'signup',title:'tutorial' });
});

app.post('/', function(req, res){
    //Grab the request body
    var body = req.body;
     
    var res_body = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email
    };
    res.render('./tempUi', res_body);
});