"use strict";

const sqlstring = require("sqlstring");
const helper = require("../../../helper/index");

const jWT = require("jsonwebtoken");


(() => {
  module.exports = async (obj) => {
    try {
      const token = jWT.sign({ obj }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hr",
      });
      const now = new Date();

      const checker = sqlstring.format(
        `select userName,token from loginusers where username = ?`,
        [obj.userName]
      );

      const [data] = await helper.mysqlHelper.query(checker);

      if (data[0].userName == obj.userName) {
        let loggedInUser = data[0]

        return loggedInUser;
      }
      else {
        loggedInUser = false

        return loggedInUser;
      }
      // const loggedInUser = data.forEach((element) => {
      //   if (obj.userName == element.userName) return data[0];
      //   else return false;
      // });


      if (!loggedInUser && obj.password == null) {
        return false;
      } else if (loggedInUser) {
        return loggedInUser;
      } else {
        const sqlquery = sqlstring.format(
          "INSERT INTO loginusers (uuid, userName, password,token, createdAt,updatedAt) VALUES (?, ?, ?, ?, ? ,?)",
          [obj.uuid, obj.userName, obj.password, token, now, new Date()]
        );
        const output = await helper.mysqlHelper.query(sqlquery);

        // const storedToken = result[0].token;

        if (output[0].affectedRows > 0) {
          return output[0];
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  };
})();
