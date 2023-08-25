

"use strict";
const sql = require('../../sql/loginusers/index');
const jWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const checkUser = require("../../sql/loginusers/checkUser");
const bcrypt = require("bcrypt");




(() => {
    module.exports = async (object) => {
        try {



            const obj = {


                userName: object.userName,
                password: object.password

            };
            const token = jWT.sign({ obj }, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' });

            const foundUser = await checkUser(obj.userName);
            if (foundUser) {
                const isPasswordValid = await bcrypt.compare(obj.password, foundUser.password);
                if (!isPasswordValid) {
                   
                    return 0;
                }

                else {
                    const validUser = {
                        userName: obj.userName,
                        password: foundUser.password,
                        uuid:foundUser.uuid,
                        token:token
                    }
                    const content = await sql.loginUser(validUser);

                    if (content == true) {

                        return {
                            status:true,
                            message: "successfully inserted into database the loginned user",
                            token: token,

                        };
                        res.status(200).send({
                            message: "successfully inserted into database the loginned user",
                            token: token,
                            name: foundUser.firstName

                        })
                    }
                    else {
                        return false;

                        res.status(400).send({
                            message: "unsuccessful  while storing loginned user", //old code
                        })
                    }

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