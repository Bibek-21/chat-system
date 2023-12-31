const express = require("express");
const http = require('http')
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const mysqlHelper = require("./helper/mysqlhelper");
const exphbr = require("express-handlebars");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const user = require("./controllers/methods/registerUsers/index");
const login = require("./controllers/methods/loginUsers/index");

const cors = require("cors"); // Import the cors module
const app = express();
app.use(express.json());
app.use(cookieParser());



let message = "";



// const mainroute = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // Use the cors middleware to enable CORS

app.use(express.static("public")); // Serve files from the 'public' directory

// app.use("/api-v1", mainroute);
const port = process.env.PORT;
const server = app.listen(port, () => {
  mysqlHelper.init();
  console.log(`Server running on '${port}'`);
});

// const server = http.createServer(app);

// const io = new Server(server);
//using session middleware to manage logins 
// const oneDay = 1000 * 60 * 60 * 24;
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false 
// }));



// io.on('connection', (socket) => {
//   socket.id=
//   console.log(`User ${socket.id} connected`);

//   // Listen for incoming messages
//   socket.on('message', (data) => {
//     console.log(`Received message from ${socket.user}: ${data}`);
//     // Broadcast the message to all connected clients
//     io.emit('message', { user: socket.user, message: data });
//   });

//   socket.on("console-server", (data)=>{
//     console.log("receievd")
//     io.emit("console-client", `${data} is recieved`)
//   })

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     console.log(`User ${socket.user} disconnected`);
//   });
// });


const io = require("socket.io")(server)
//Loads the handlebars module
app.engine(
  "hbs",
  exphbr.engine({
    layoutsDir: __dirname + "/views/layouts",
    //new configuration parameter
    extname: "hbs",
    defaultLayout: "home",
    partialsDir: __dirname + "/views/partials/",
  })
);

// app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "hbs"); //Sets our app to use the handlebars engine

//Serves static files (we need it to import a css file)
app.use(express.static(__dirname + "public"));

//for registering users related tasks
//Sets a basic route

app.get("/", (req, res) => {
  res.render("./layouts/signup", { layout: "signup", title: "registeruser" });
});

app.get("/api-v1/register/createuser", (req, res) => {
  res.render("./layouts/signup", { layout: "signup", title: "registeruser" });
});

app.post("/api-v1/register/createuser", async (req, res) => {
  const obj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  if (!obj.firstName || !obj.lastName || !obj.email || !obj.password) {
    let message = `Provide Valid Details!`;
    res.render("./layouts/signup", {
      layout: "signup",
      title: "registeruser",
      message,
    });
  } else {
    const insertUser = await user.createUser(obj);
    console.log(insertUser);

    if (insertUser == true) {
      const message = `User ${obj.firstName} ${obj.lastName} successfully registered! Now you can proceed to Login`;
      res.render("./layouts/signup", {
        layout: "signup",
        title: "registeruser",
        message,
      });
    } else {
      const message = `could not register the user`;
      res.render("./layouts/signup", {
        layout: "signup",
        title: "registeruser",
        message,
      });
    }
  }
});

//for login related tasks

app.get("/api-v1/login/loginuser", (req, res) => {
  res.render("./layouts/login", { layout: "login", title: "loginuser" });
});

// app.get('/api-v1/login/loginuser',(req,res) => {
//   session=req.session;
//   if(session.userid){
//     res.render("./layouts/login", { layout: "login", title: "loginuser" });
//   }else
//   res.render("./layouts/login", { layout: "login", title: "login", message });
// });




app.post("/api-v1/login/loginuser", async (req, res) => {
  const obj = {
    userName: req.body.userName,
    password: req.body.password,
  };

  if (!obj.userName || !obj.password) {       //if both field are null
    message = `Provide Valid Details!`;
    res.render("./layouts/login", { layout: "login", title: "login", message });
  }
  // else if(obj.username||obj.password){
  //   const usernameExists= await user.readUsersByEmail
  // }
  
  else {
    //it stores the user into database and gives status true and gives a token
    const loginUser = await login.loginUser(obj); 
    console.log({ loginUser });
    if (loginUser == 0) {
      message = `Provide Valid Details!`;
      return res.render("./layouts/login", {
        layout: "login",
        title: "login",
        message,
      });
    } else if (loginUser == false) {
      message = `could not login the user`;
      return res.render("./layouts/login", {
        layout: "login",
        title: "login",
        message,
      });

    } else if (loginUser.status == true) {
      const myname = obj.userName;
      const loggedInUsers = await login.readUsers();

      return res.render("./layouts/tempUi", {
        layout: "tempUi",
        title: "Messenger",
        myname,
        loggedInUsers,
      });
    } else {
      return res.render("./layouts/login", { layout: "login", title: "login" });
    }
  }

 
  

});

io.on('connection', (socket) => {

  console.log(`User  connected`);


  // Listen for incoming messages
  socket.on('message', (data) => {
    console.log(`Received message  from client to server and socketId is ${socket.id},${data.message}`);
    socket.broadcast.emit('chat-message', data);
  console.log("testing progress11111");
  });


  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User  disconnected`);
  });
});

//for token verify or message box  related tasks

// app.get('/verify/users', (req, res) => {
//     res.render('./tempUi', { layout: 'verify', title: 'verifyuser' });
// });
// server.listen(port, () => {
//   mysqlHelper.init();
//   console.log(`Server running on '${port}'`);
// });