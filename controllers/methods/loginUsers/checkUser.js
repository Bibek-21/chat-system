"use strict";
const sql = require("../../sql/loginusers/index");

(()=>{
module.exports= async(obj)=>{
    try {
        const content = await sql.checkUser(obj.userName);

        if (content == true) {
          
            return content ;

        }
        else {
     
        return false;
        }


    } catch (error) {
        console.log(`There is some error ${error}`);
    }
}


})();