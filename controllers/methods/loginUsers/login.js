

"use strict";
const sql = require('../../sql/loginusers/index');
const jWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const checkUser = require("../../sql/loginusers/checkUser");
const bcrypt = require("bcrypt");




(() => {
    module.exports = async (req, res, next) => {
        try {
           

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

                else {
                    const content = await sql.loginUser(obj,foundUser.uuid,token);

                    if (content == true) {
                        res.status(200).send({
                            message: "successfully inserted into database the loginned user"
                        })
                    }
                    else {
                        res.status(400).send({
                            message: "unsuccessful  while storing loginned user",
                        })
                    }
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