"use strict";
const sql = require("../../sql/loginusers/index");

(()=>{
module.exports= async()=>{
    try {
        const content = await sql.readUsers();

        if (content) {
          
            return content;

        }
        else {
     
        return false;
        }


    } catch (error) {
        console.log(`There is some error ${error}`);
    }
}





})();