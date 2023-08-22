"use strict";
const sqlstring = require("sqlstring");
const helper = require("../../../helper/index");
(() => {
  module.exports = async (obj) => {
    try {
      const { v4: uuidv4 } = require('uuid');
      const now = new Date();
      const userEmail= obj.email;
   const checker = sqlstring.format(`select email from registerusers`)

      const [result] = await helper.mysqlHelper.query(checker);

      const addable= result.forEach(element => {
        if(userEmail==element) return false;
        else return true;
        
      });

      if (addable) {
        return false
      }

      else {





        const querystring = sqlstring.format(`INSERT INTO registerusers  (uuid, firstName,lastName, email, password, createdAt) VALUES (?, ?, ?, ?, ?, ?) `, 
        [uuidv4(),
        obj.firstName,
        obj.lastName,
        obj.email,
        obj.password,
        now
       ]);


        const [sqlquery] = await helper.mysqlHelper.query(querystring);

        if (sqlquery.affectedRows > 0) {
          return true;
        } else {
          return false;
        }

      }
    } catch (error) {
      console.log(error);
    }
  }
})();
