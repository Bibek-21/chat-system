const express = require('express');
const bodyParser = require('body-parser');
const mysqlHelper = require('./helper/mysqlhelper');
const app = express();
app.use(express.json());



const mainroute = require("./routes/index.js");
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api-v1", mainroute);
const port = process.env.PORT;

app.listen(port, () => {
    mysqlHelper.init();
    console.log(`Server running on '${port}'`);
})