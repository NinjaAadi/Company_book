const mysql = require("../Utils/Database2").pool;
/*
@desc : Insert/Create a field table for company
@route : field/createfield
@access : private
*/
exports.createfield = async (req, res, next) => {
  try {
    //First add it in the fields tab and then add it in comopany tab
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const { field_name, field_original } = req.body;
      let query =
        "SELECT * FROM C_FIELDS WHERE NAME = " + "'" + field_name + "';";
      new Promise((resolve, reject) => {
        conn.query(query, function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows.length > 0) {
            return res.status(400).json({
              message: "Field already exists",
            });
          }
          resolve("Success");
        });
      }).then(() => {
        query =
          "INSERT INTO C_FIELDS (NAME,ISORIGINAL) VALUES (" +
          "'" +
          field_name +
          "'," +
          field_original +
          ");";
        //Insert into field table
        conn.query(query, function (err, rows) {
          if (err) {
            throw err;
          }
        });

        //Insert into the company table
        query = "ALTER TABLE COMPANY ADD " + field_name + " VARCHAR(255);";
        conn.query(query, function (err, rows) {
          if (err) {
            throw err;
          }
        });
        return res.status(200).json({
          message: "Field added successfully!",
        });
      });
    });
  } catch (error) {
    console.log("Error in creating fields", error);
  }
};
/*
@desc : Edit a field name for the company
@route : field/editfield
@access : private
*/
exports.editfields = async (req, res, next) => {
  console.log("Field being edited...");
  try {
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      //Edit the field name from the company as well as from the field
      const { old_name, new_name } = req.body;
      let query =
        "UPDATE C_FIELDS SET NAME = " +
        "'" +
        new_name +
        "'" +
        " WHERE NAME = " +
        "'" +
        old_name +
        "';";
      conn.query(query, function (err, rows) {
        if (err) {
          return err;
        }
      });

      //Change from the main company table
      query =
        "ALTER TABLE COMPANY RENAME COLUMN " +
        old_name +
        " TO " +
        new_name +
        ";";
      conn.query(query, function (err, rows) {
        if (err) {
          return err;
        }
      });
      res.status(200).json({
        message: "Field edited successfully",
      });
    });
  } catch (error) {
    console.log("Error in editing the field name", error);
  }
};
/*
@desc : Function to delete a field from the database
@route : field/deletefield
@access : private
*/
exports.deletefield = async (req, res, next) => {
  console.log("Field being deleted");
  try {
    //First delete it from the c_field table and then delete it from the company table
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const field_name = req.body.field_name;
      let query =
        "DELETE FROM C_FIELDS WHERE NAME = " + "'" + field_name + "';";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });

      //Delete it from the company table
      query = "ALTER TABLE COMPANY DROP COLUMN " + field_name + ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });
      return res.status(200).json({
        message: "Field deleted successfully",
      });
    });
  } catch (error) {
    console.log("Error in deleting field", error);
  }
};
/*
@desc : Function to get all the fields in database
@route : field/getallfields
@access : private
*/
exports.getallfields = async (req, res, next) => {
  try {
    console.log("Field being fetched...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query = "SELECT * FROM C_FIELDS;";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
        res.status(200).json({ rows });
      });
    });
  } catch (error) {
    console.log(error);
  }
};
