const mysql = require("../Utils/Database2").pool;
/*
@desc : GET ALL THE FIELDS BASED ON GROUPS
@route : query/groups
@access : private 
*/
exports.getgroupedcompanies = async (req, res, next) => {
  try {
    console.log("Companies are being grouped...");
    const g_string = req.body.g_string;
    const g_id = g_string.split(",");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      let query =
        "SELECT C.C_ID FROM  COMPANY C JOIN G_LINK GL ON C.C_ID = GL.C_ID JOIN C_GROUP G ON GL.G_ID = G.G_ID WHERE G.G_ID IN ";
      query += "(" + g_string + ");";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }

        const c_set = new Set();
        rows.map((c) => {
          c_set.add(c.C_ID);
        });
        const C_ID = [];
        c_set.forEach((id) => {
          C_ID.push(id);
        });
        return res.status(200).json({
          C_ID,
        });
      });
      conn.release();
    });
  } catch (error) {
    console.log("Error in fetching companies...", error);
  }
};
/*
@desc :Function to get all the if the first name of the companies mathes the query string 
@route : query/getcompanybasedonfirstname
@access : private
*/
exports.getfirstname = async (req, res, next) => {
  try {
    console.log("Fetching companies based on regular expressions1...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const { q_string } = req.body;
      const regx = "'^" + q_string + "'";
      const query =
        "SELECT C_ID FROM COMPANY WHERE C_NAME REGEXP " + regx + ";";

      conn.query(query, function (err, rows) {
        if (err) {
          console.log("error".red);
          throw err;
        }
        const c_id = [];
        rows.map((id) => {
          c_id.push(id);
        });
        return res.status(200).json({
          c_id,
        });
      });
      conn.release();
    });
  } catch (error) {
    console.log("Error in fetching company based on first name...", error);
  }
};
/*
@desc :Function to get all the if the first name of the companies mathes the query string 
@route : query/getcompanybasedonname
@access : private
*/
exports.getallnames = async (req, res, next) => {
  try {
    console.log("Fetching companies based on regular expressions2...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const { q_string } = req.body;
      const regx = "'" + q_string + "'";
      const query =
        "SELECT C_ID FROM COMPANY WHERE C_NAME REGEXP " + regx + ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
        const c_id = [];
        rows.map((id) => {
          c_id.push(id);
        });
        return res.status(200).json({
          c_id,
        });
      });
      conn.release();
    });
  } catch (error) {
    console.log("Error in fetching company based on first name...", error);
  }
};
/*
 
*/
