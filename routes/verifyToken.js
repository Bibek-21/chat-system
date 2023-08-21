"use strict";
(()=>{
    
    const express = require("express");
    const router = express.Router();

    const verifyUserToken= require("../controllers/methods/registerUsers/index")

    router.get("/users", verifyUserToken, (req, res) => {
        res.json(users);
      });
   

    module.exports=router;

})();