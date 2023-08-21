"use strict";

const sqlstring = require("sqlstring")
const mysqlHelper = require("../../helper/mysqlHelper");
(() => {
    module.exports = async (name) => {
        try {
            const sqlquery = sqlstring.format("select uuid  from userinfos where userName= ?", [name]);

            const user_uuid = await mysqlHelper.query(sqlquery);

            if (!user_uuid || user_uuid[0].length === 0 ) {
                return false; // Return a specific value indicating no info was found
              }

            // if (user_uuid.length !== 0) {
            //     return user_uuid;

            // }

            // else if (user_uuid) {
            //     return user_uuid;

            // }
            else {
                return user_uuid;
            }
        } catch (error) {
            console.error('Error retrieving UUID:', error);

            throw error;
        }
    }


})();