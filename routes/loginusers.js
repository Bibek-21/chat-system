"use strict";
(()=>{
    
    const express = require("express");
    const router = express.Router();

    const user= require("../controllers/methods/loginUsers/index")

    router.post('/loginuser',user.loginUser,);

    // router.post('/loginuser',(req, res) => {
    //     res.render('./layouts/login', { layout: 'login', title: 'loginuser' });
    // });
   

    module.exports=router;

})();