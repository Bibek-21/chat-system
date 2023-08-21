"use strict";
(()=>{
    
    const express = require("express");
    const router = express.Router();

    const user= require("../controllers/methods/registerUser/index")



    router.post('/createuser',user.createUser);
   




    module.exports=router;

})();