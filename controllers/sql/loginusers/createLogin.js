"use strict";

const sqlstring = require("sqlstring")
const mysqlHelper = require("../../../helper/mysqlhelper");
(() => {
    module.exports = async (obj,uuid, token) => {
        try {


                const sqlquery = sqlstring.format("INSERT INTO loginusers (uuid, userName, password,token) VALUES (?, ?, ?,?)", [uuid, obj.userName, obj.password, token]);
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