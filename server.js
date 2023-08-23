

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
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs',
    defaultLayout: 'home',
    partialsDir: __dirname + '/views/partials/',
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
    res.render('./layouts/signup', { layout: 'signup', title: 'registeruser' });
});

app.get('/register/createuser', (req, res) => {
    res.render('./layouts/signup', { layout: 'signup', title: 'registeruser' });
});

app.post('/register/createuser', function (req, res) {
    //Grab the request body
    var request = req.body; // send this to backend to store in db
    create.createUser(request)

    // var res_body = {
    // firstName: body.firstName,
    // lastName: body.lastName,
    // email: body.email,
    // password:body.password
    // };
    // res.render('./tempUi', res_body);   
});


// app.get('/login/loginuser', (req, res) => {
//     res.render('.//login', { layout: 'login', title: 'loginuser' });
// });

