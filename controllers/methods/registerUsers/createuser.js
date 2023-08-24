"use strict";

const sql = require("../../sql/registerUsers/index");
const helper = require("../../../helper/index.js");

const bcrypt = require("bcrypt");
const login = require("../loginUsers/login");

(() => {
    module.exports = async (object) => {
        try {
            // const passwordHash=helper.hashPassword(req.body.password) 
            const salt = 5; //CPU USAGES INCREASES AS VALUE INCREASES, A salt is a random string that makes the hash unpredictable
            const hashpassword = await bcrypt.hash(object.password, salt);
            const obj = {

                firstName: object.firstName,
                lastName: object.lastName,
                email: object.email,
                password: hashpassword

            };

            // const duplicateData = checkDuplicate(email)

            if (!obj.firstName || !obj.lastName || !obj.email || !obj.password) {
                // res.send("All details must be provided")
                return false;
            }
            const content = await sql.createUser(obj);
            if (content == true) {
                // res.status(200).send({
                //     message: "successfully created"
                // })

                // res.render('./tempUi', { layout: 'verify', title: 'verifyuser' });
                return true;

            }
            else {
            //     res.status(400).send({
            //         message: "unsuccessful attempt",
            //     })
            return false;
            }


        } catch (error) {
            console.log(error);

        }

    }

})();