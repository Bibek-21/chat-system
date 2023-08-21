

"use strict";
const login = require('../../sql/loginusers/index');
const checkUser = require("../../sql/loginusers/checkUser");
const bcrypt = require("bcrypt");
const dotenv= require("dotenv")
dotenv.config();



(() => {
    module.exports = async (req, res, next) => {
        try {
            const jWT = require("jsonwebtoken");
            const dotenv = require("dotenv");
            dotenv.config();

            // const passwordhash = await hashpassword(req.body.password);

            const obj = {
                userName: req.body.userName,
                password: req.body.password
            };
            const token = jWT.sign({ obj }, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' });

            const foundUser = await checkUser(obj.userName);
            if (foundUser) {
                const isPasswordValid = await bcrypt.compare(obj.password, foundUser.password);
                if (!isPasswordValid) {
                    return res.status(400).send("Invalid email or password");
                }
                else{
                    res.status(200).send({
                        message: 'successfully Logged In',
                        token: token
                    })
                }

            }

               
            




            else {
                res.status(400).send({
                    message: 'User not found',
                    success: false
                })
            }




        } catch (error) {
            console.log(error);
        }
    }

})();