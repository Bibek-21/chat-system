"use strict";
const mysql = require('mysql2/promise');
const sqlstring = require("sqlstring");

((mysqlHelper)=>{
    let dbClient = null;
    mysqlHelper.init = async() =>{
        try{
            if(!dbClient){
                dbClient  = await mysql.createPool({
                    user:process.env.MYSQL_DB_USER,
                    host:process.env.MYSQL_DST,
                    port:process.env.MYSQL_DB_PORT,
                    database:process.env.MYSQL_DB_NAME,
                    password:process.env.MYSQL_DB_PASSWORD
                });  
            }
            return dbClient;
            
        }catch(error){
                throw error;
        }
    };
    
    mysqlHelper.query = async (query) => {
        try {
          let res = await dbClient.query(query);
          return res;
        } catch (error) {
          throw error;
        }
      };

    mysqlHelper.checkStudent= async(symbolNo)=>{
      const querystring = sqlstring.format(`select * from students where symbolNo= ? `, [symbolNo]);

      const [sqlquery] = await helper.mysqlHelper.query(querystring)
      console.log(sqlquery);



      if (sqlquery[0]) {
          return true;
      }
      else {
          return false;
      }
    }

})(module.exports);