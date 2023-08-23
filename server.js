

const express = require('express');
const bodyParser = require('body-parser');
const mysqlHelper = require('./helper/mysqlhelper');
const exphbr = require("express-handlebars")
const create= require("./controllers/methods/registerUsers/index")
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


function tokenValid() {
    let socketConnected = new Set();

    function onconnection(socket) {
        console.log(socket.id);

        socketConnected.add(socket.id)

        // io.emit('clients-total', socketConnected.size)


        // connect a socket between two users

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
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs',
    defaultLayout: 'home',
    partialsDir: __dirname + '/views/partials/',
}));

app.set('view engine', 'hbs')     //Sets our app to use the handlebars engine

//Serves static files (we need it to import a css file)
app.use(express.static(__dirname + 'public'))







//for registering users related tasks
//Sets a basic route

app.get('/', (req, res) => {
    res.render('./layouts/signup', { layout: 'signup', title: 'registeruser' });
});

app.get('/register/createuser', (req, res) => {
    res.render('./layouts/signup', { layout: 'signup', title: 'registeruser' });
});

app.post('/api-v1/register/createuser', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Simulate database storage
    users.push({ firstName, lastName, email, password });

    const message = `User ${firstName} ${lastName} successfully registered!`;
    res.render('./layouts/signup', { message });
});



//for login related tasks

app.get('/login/loginuser', (req, res) => {
    res.render('./layouts/login', { layout: 'login', title: 'loginuser' });
});

app.post('/api-v1/register/createuser', (req, res) => {
    const { userName,  password } = req.body;
    
    // Simulate database storage
    users.push({ userName, password });

    res.render('./tempUi', { userName  });
});



//for token verify or message box  related tasks

app.get('/verify/users', (req, res) => {
    res.render('./tempUi', { layout: 'verify', title: 'verifyuser' });
});

