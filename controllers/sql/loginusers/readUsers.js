"use strict";
const sqlstring = require("sqlstring")

const mysqlHelper = require("../../../helper/mysqlhelper");

(()=>{
    module.exports= async()=>{
    try {
        

        const querystring = sqlstring.format(`select userName from loginusers `);


        const [output] = await mysqlHelper.query(querystring);

        if (output) {
          // console.log("testing");
          return output;
        } else {
          return false;
        }

      }
        
     catch (error) {
        console.log(`There is an error ${error}`);
    }
}
})();