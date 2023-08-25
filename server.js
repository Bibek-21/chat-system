

const express = require('express');
const bodyParser = require('body-parser');
const mysqlHelper = require('./helper/mysqlhelper');
const exphbr = require("express-handlebars")
const user = require("./controllers/methods/registerUsers/index")
const login = require("./controllers/methods/loginUsers/index")


const cors = require('cors'); // Import the cors module
const app = express();
app.use(express.json());

const mainroute = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // Use the cors middleware to enable CORS

app.use(express.static('public')); // Serve files from the 'public' directory

// app.use("/api-v1", mainroute);
const port = process.env.PORT;

const server = app.listen(port, () => {
    mysqlHelper.init();
    console.log(`Server running on '${port}'`);
})

const io = require('socket.io')(server)

let socketConnected = new Set();

function onconnection(socket) {
    console.log(socket.id);

    socketConnected.add(socket.id)

    // io.emit('clients-total', socketConnected.size)


    // connect a socket between two users

    // socket.on('disconnect', () => {     //perform for logout 
    //     console.log('socket disconnected ', socket.id);
    //     socketConnected.delete(socket.id);
    //     io.emit('clients-total', socketConnected.size);

    // })

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






//Loads the handlebars module
app.engine('hbs', exphbr.engine({
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs',
    defaultLayout: 'home',
    partialsDir: __dirname + '/views/partials/',
}));

// app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs')     //Sets our app to use the handlebars engine

//Serves static files (we need it to import a css file)
app.use(express.static(__dirname + 'public'))







//for registering users related tasks
//Sets a basic route

app.get('/', (req, res) => {
    res.render('./layouts/signup', { layout: 'signup', title: 'registeruser' });
});

app.get('/api-v1/register/createuser', (req, res) => {

    res.render('./layouts/signup', { layout: 'signup', title: 'registeruser' });
});



app.post('/api-v1/register/createuser', async (req, res) => {
    const obj = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password

    }
    if (!obj.firstName || !obj.lastName || !obj.email || !obj.password) {
        let message = `Provide Valid Details!`;
        res.render('./layouts/signup', { layout: 'signup', title: 'registeruser', message });

    }

    else {
        const insertUser = await user.createUser(obj);
        console.log(insertUser);

        if (insertUser == true) {
            const message = `User ${obj.firstName} ${obj.lastName} successfully registered! Now you can proceed to Login`;
            res.render('./layouts/signup', { layout: 'signup', title: 'registeruser', message });
        }
        else {
            const message = `could not register the user`;
            res.render('./layouts/signup', { layout: 'signup', title: 'registeruser', message });

        }

    }


});


//for login related tasks

app.get('/api-v1/login/loginuser', (req, res) => {
    res.render('./layouts/login', { layout: 'login', title: 'loginuser' });
});

app.post('/api-v1/login/loginuser', async (req, res) => {
    const obj = {

        userName: req.body.userName,
        password: req.body.password

    }
    let message = '';

    if (!obj.userName || !obj.password) {
        message = `Provide Valid Details!`;
        res.render('./layouts/login', { layout: 'login', title: 'login', message });

    }

    else {
        const loginUser = await login.loginUser(obj);
        if (loginUser == 0) {
            message = `Provide Valid Details!`;
            return res.render('./layouts/login', { layout: 'login', title: 'login', message });
        }

        else if (loginUser == false) {
            message = `could not login the user`;
            return res.render('./layouts/login', { layout: 'login', title: 'login', message });
        }

        else if (loginUser.status == true) {
            const myname = obj.userName;
            const loggedInUsers = login.readUsers()
            return res.render('./layouts/tempUi', { layout: 'tempUi', title: 'Messenger', myname, loggedInUsers},);
        }

        else {
            return res.render('./layouts/login', { layout: 'login', title: 'login' });

        }

    }

});


//for token verify or message box  related tasks

// app.get('/verify/users', (req, res) => {
//     res.render('./tempUi', { layout: 'verify', title: 'verifyuser' });
// });

