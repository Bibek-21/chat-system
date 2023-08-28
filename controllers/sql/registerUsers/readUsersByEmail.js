"use strict";
const sql = require("../../sql/registerUsers/index");
const helper = require(".././../../helper/index");
const sqlstring = require("sqlstring");
() => {
  module.exports = async (email) => {
    try {
      const query = sqlstring.format(
        `select * from registerusers where email = ? `[email]
      );


      const [result] = await helper.mysqlHelper.query(query);


      if (result.affectedRows > 0) {
        return result;
      } else {
        return false;
      }


    } catch (error) {
      console.log(error);
    }
  };
};
