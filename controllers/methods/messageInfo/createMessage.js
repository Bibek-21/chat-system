"use strict";

const sql = require("../../sql/registerUsers/index");
const helper = require("../../../helper/index.js");

const bcrypt = require("bcrypt");

(() => {
    module.exports = async (object) => {
        try {
            const salt = 5; //CPU USAGES INCREASES AS VALUE INCREASES, A salt is a random string that makes the hash unpredictable
            const obj = {

                userId: object.userId,
                roomId: object.roomId,
                mesageBody: object.mesageBody,
                isdelete: object.isdelete


            };


           
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