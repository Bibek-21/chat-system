"use strict";

const sqlstring = require("sqlstring")
const mysqlHelper = require("../../../helper/mysqlhelper");
(() => {
    module.exports = async (obj) => {
        try {

            const now = new Date();
            const sqlquery = sqlstring.format("INSERT INTO loginusers (uuid, userName, password,token, createdAt) VALUES (?, ?, ?, ?,?)", [obj.uuid, obj.userName, obj.password, obj.token, now]);
            const output = await mysqlHelper.query(sqlquery);

            // const storedToken = result[0].token;


            if (output[0].affectedRows > 0) {
                return true

            }
            else {
                return false
            }


        } catch (error) {
            throw error;
        }
    }

})();