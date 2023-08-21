"use strict";

(() => {
    const express = require("express");
    const router = express.Router();

    const user = require('./registerusers');
   
    router.use('/users', user);
  

    
    module.exports = router;
})();