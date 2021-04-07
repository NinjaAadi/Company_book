const mysql = require("../Utils/Database2").pool;

/*
@desc : Function to add module in database
@route : module/createmodule
@access : private
*/
exports.createmodule = async (req, res, next) => {
  try {
    console.log("New module being created...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query =
        "INSERT INTO C_MODULE (M_NAME) VALUES ('" + req.body.m_name + "');";
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

/*
@desc : Function to DELETE module in database
@route : module/deletemodule
@access : private
*/
exports.deletemodule = async (req, res, next) => {
  try {
    console.log("Module being deleted...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query =
        "DELETE FROM C_MODULE WHERE M_ID = (" + req.body.m_id + ");";
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
/*
@desc : Function to edit module in database
@route : module/editmodule
@access : private
*/
exports.editmodule = async (req, res, next) => {
  try {
    console.log("Module being edited...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query =
        "UPDATE C_MODULE SET M_NAME='" +
        req.body.m_name +
        "'WHERE M_ID=" +
        req.body.m_id +
        ";";
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
/*
@desc : Function to get all the modules in database
@route : module/getallmodules
@access : private
*/
exports.getallmodule = async (req, res, next) => {
  try {
    console.log("Modules being fetched...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query = "SELECT * FROM C_MODULE;";
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
