"use strict";
const jwt = require("jsonwebtoken");
(()=>{
    module.exports= async (req, res, next)=>{
        // const userName = [];

         
            if (!req.headers.authorization){
              return res.status(401).send("Unauthorized request");
            }
            const token = req.headers["authorization"].split(" ")[1];
            if (!token) {
              return res.status(401).send("Access denied. No token provided.");
            }
            try {
              const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
              req.userName = decoded.userName;
              console.log(decoded.obj.userName);
              res.status(200).send(`access given to ${decoded.obj.userName}`);             //work to be done give access to send message if the token is verified
              next();
            } catch (err) {
              res.status(400).send("Invalid token.");
            }
          }
          
    

})();