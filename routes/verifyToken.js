"use strict";
(()=>{
    
    const express = require("express");
    const router = express.Router();

    const verifyUserToken= require("../controllers/methods/loginUsers/verifyToken")

    // router.get("/users", (req, res) => {
    //     const users = [];
    //     verifyUserToken;
    //     res.json(users);
    //   });
    router.get("/users",verifyUserToken)
   

    module.exports=router;

})();


// {
//     const decoded = jwt.verify(jwtToken, secretKey);

//     if (decoded.username) {
//         const username = decoded.username;
//         return res.json({ username });
//     } else {
//         return res.status(400).json({ error: 'JWT does not contain a username claim.' });
//     }
// } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//         return res.status(401).json({ error: 'JWT has expired.' });
//     } else {
//         return res.status(401).json({ error: 'Invalid JWT.' });
//     }
// }