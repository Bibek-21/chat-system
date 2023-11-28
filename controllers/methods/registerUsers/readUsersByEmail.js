"use strict";
const sql = require("../../sql/registerUsers/index");
(() => {
  module.exports = async (obj) => {
    try {
      const result = sql.readUserbyEmail(obj.userName);

      if (result) {
        console.log("found an user");
        return result;
      } else {
        console.log("Did not found an user");
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
})();
