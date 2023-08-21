"use strict";

const sql = require("../../sql/registerUsers/index");
const helper = require("../../../helper/index.js");

const bcrypt = require("bcrypt");

(() => {
    module.exports = async (req, res) => {
        try {
            // const passwordHash=helper.hashPassword(req.body.password) 
            const salt = 5; //CPU USAGES INCREASES AS VALUE INCREASES, A salt is a random string that makes the hash unpredictable
            const hashpassword = await bcrypt.hash(req.body.password, salt);
            const obj = {

                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashpassword

            };

            // const duplicateData = checkDuplicate(email)


            const content = await sql.createUser(obj);
            if (content == true) {
                res.status(200).send({
                    message: "successfully created"
                })
            }
            else {
                res.status(400).send({
                    message: "unsuccessful attempt",
                })
            }


        } catch (error) {
            console.log(error);

        }

    }

})();