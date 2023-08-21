"use strict";
const jwt = require("jsonwebtoken");
(()=>{
    module.exports= async (req, res, next)=>{
        // const userName = [];

         
            if (!req.headers.authorization){
              return res.status(401).send("Unauthorized request");
            }
            const token = req.headers["Authorization"].split(" ")[1];
            if (!token) {
              return res.status(401).send("Access denied. No token provided.");
            }
            try {
              const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
              req.userName = decoded.userName;
              next();
            } catch (err) {
              res.status(400).send("Invalid token.");
            }
          }
          
    

})();