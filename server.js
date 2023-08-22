

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
