"use strict";

const sqlstring = require("sqlstring")
const mysqlHelper = require("../../helper/mysqlHelper");
const checkUser = require("./checkUser_availablitiy");
(() => {
    module.exports = async (obj, uuid_user, token) => {
        try {

            const userexists = checkUser(obj.userName);

            if (!userexists) {
                const sqlquery = sqlstring.format("INSERT INTO logins (uuid, userName, password,token) VALUES (?, ?, ?,?)", [uuid_user.uuid, obj.userName, obj.password, token]);
                const output = await mysqlHelper.query(sqlquery);

                // const storedToken = result[0].token;


                if (output[0].affectedRows > 0) {
                    return true

                }
                else {
                    return false
                }

            }
            else{//user doesnot exist
                return false
            }
        } catch (error) {
            throw error;
        }
    }

})();