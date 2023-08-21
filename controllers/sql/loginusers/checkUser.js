"use strict";

const sqlstring = require("sqlstring")
const mysqlHelper = require("../../../helper/mysqlhelper");
(() => {
    module.exports = async (email) => {
        try {
            const sqlquery = sqlstring.format("select email,password  from registerusers where email= ?", [email]);

            const [user] = await mysqlHelper.query(sqlquery);

            if (user[0].length === 0 ) {
                return false; // Return a specific value indicating no info was found
              }

           
            else {
                return user[0];
            }
        } catch (error) {
            console.error('Error retrieving mail:', error);

            throw error;
        }
    }


})();