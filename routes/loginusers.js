"use strict";
(()=>{
    
    const express = require("express");
    const router = express.Router();

    const user= require("../controllers/methods/loginUsers/index")

    router.post('/loginuser',user.loginUser);
   

    module.exports=router;

})();