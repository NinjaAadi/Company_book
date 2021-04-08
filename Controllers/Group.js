const mysql = require("../Utils/Database2").pool;

/*
@desc : Function to add groups in database
@route : groups/creategroup
@access : private
*/
exports.creategroup = async (req, res, next) => {
  try {
    console.log("New group being created...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query =
        "INSERT INTO C_GROUP (G_NAME) VALUES ('" + req.body.g_name + "');";
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
@desc : Function to DELETE groups in database
@route : groups/deletegroup
@access : private
*/
exports.deletegroup = async (req, res, next) => {
  try {
    console.log("Group being deleted...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }

      //Delete from the link table first
      const tquery = "DELETE FROM G_LINK WHERE G_ID = (" + req.body.g_id + ");";
      conn.query(tquery,function(err,rows){
        if(err){
          throw err;
        }
      });
      //Delete from the group table 
      const query = "DELETE FROM C_GROUP WHERE G_ID = (" + req.body.g_id + ");";
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
@desc : Function to DELETE groups in database
@route : groups/editgroup
@access : private
*/
exports.editgroup = async (req, res, next) => {
  try {
    console.log("Group being edited...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query =
        "UPDATE C_GROUP SET G_NAME='" +
        req.body.g_name +
        "'WHERE G_ID=" +
        req.body.g_id +
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
@desc : Function to get all the groups in database
@route : groups/getallgroups
@access : private
*/
exports.getallgroup = async (req, res, next) => {
  try {
    console.log("Group being fetched...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query = "SELECT * FROM C_GROUP;";
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
