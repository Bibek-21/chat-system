"use strict";

(() => {
    const express = require("express");
    const router = express.Router();

    const register = require('./registerusers');
    const login = require("./loginusers")
   
    router.use('/register', register);
    router.use('/login',login)
    router.use("/verify")
  

    
    module.exports = router;
})();