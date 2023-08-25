"use strict";
(()=>{
    module.exports= async()=>{
    try {
        

        const querystring = sqlstring.format(`select userName from loginusers `);


        const [sqlquery] = await helper.mysqlHelper.query(querystring);

        if (sqlquery.affectedRows > 0) {
          return true;
        } else {
          return false;
        }

      }
        
     catch (error) {
        console.log(`There is an error ${error}`);
    }
}
})();