"use strict";
const sql = require("../../sql/registerUsers/index");

(()=>{
module.exports= async(obj)=>{
    try {
        const content = await sql.readRegisterUser(obj.userName);

        if (content == true) {
          
            return ;

        }
        else {
     
        return false;
        }


    } catch (error) {
        console.log(`There is some error ${error}`);
    }
}





})();