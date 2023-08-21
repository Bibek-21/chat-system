"use strict";

(() => {
    const express = require("express");
    const router = express.Router();

    const user = require('./studentRoutes');
   
    router.use('/student', user);
  

    
    module.exports = router;
})();