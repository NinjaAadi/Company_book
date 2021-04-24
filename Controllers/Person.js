const mysql = require("../Utils/Database2").pool;
/*
@desc : Create a person for a particular company
@routes : person/createperson
@access : private
*/
exports.createperson = async (req, res, next) => {
  console.log("Person is being created...");
  try {
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const { C_ID, NAME, DESIGNATION, MOBILE, EMAIL } = req.body;
      const query =
        "INSERT INTO C_PERSON (C_ID,NAME,DESIGNATION,MOBILE,EMAIL) VALUES (" +
        C_ID +
        "," +
        "'" +
        NAME +
        "'," +
        "'" +
        DESIGNATION +
        "'," +
        "'" +
        MOBILE +
        "'," +
        "'" +
        EMAIL +
        "');";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });
      res.status(200).json({
        message: "Person details inserted successfully!",
      });
    });
  } catch (error) {
    console.log("Error in inserting person");
  }
};
/*
@desc : Delete a person for a particular company
@routes : person/deleteperson
@access : private
*/
exports.deleteperson = async (req, res, next) => {
  console.log("Person's record being deleted...");
  try {
    mysql.getConnection(function (err, conn) {
      const p_id = req.body.p_id;
      const query = "DELETE FROM C_PERSON WHERE ID  = " + p_id + ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });
      return res.status(200).json({
        message: "Deleted person's record successfully!",
      });
    });
  } catch (error) {
    console.log("Error in deleting this person's record", error);
  }
};
/*
@desc : Edit a person's details for a particular company
@routes : person/deleteperson
@access : private
*/
exports.editperson = async (req, res, next) => {
  try {
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const { NAME, DESIGNATION, MOBILE, EMAIL, p_id } = req.body;
      const query =
        "UPDATE C_PERSON SET NAME = " +
        "'" +
        NAME +
        "',DESIGNATION = " +
        "'" +
        DESIGNATION +
        "',MOBILE = " +
        "'" +
        MOBILE +
        "',EMAIL = " +
        "'" +
        EMAIL +
        "'WHERE ID = " +
        p_id +
        ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });
      res.status(200).json({
        message: "Person's record updated successfully",
      });
    });
  } catch (error) {
    console.log("Error in editing the records for a person", error);
  }
};
/*
@desc : Get all persons for a particular company
@routes : person/getallperson
@access : private
*/
exports.getallperson = async (req, res) => {
  try {
    mysql.getConnection(function (err, conn) {
      if (err) throw err;
      const id = req.body.C_ID;
      const query = "SELECT * FROM C_PERSON WHERE C_ID = " + id + ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
        return res.status(200).json({
          rows,
        });
      });
    });
  } catch (error) {
    console.log("Error in fetching all the person for a particular company!");
    console.log(error);
  }
};
