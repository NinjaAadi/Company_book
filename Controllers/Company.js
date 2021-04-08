const mysql = require("../Utils/Database2").pool;
/*
@desc : Function to create a company
@router : /company/createcompany
@access : private
*/
exports.createcompany = async (req, res, next) => {
  try {
    console.log("New company being created");
    const group = req.body.C_G_ID;
    const module = req.body.C_M_ID;
    mysql.getConnection(async function (err, conn) {
      if (err) {
        throw err;
      }

      const queryobj = req.body;
      const name = Object.keys(queryobj);
      const values = Object.values(queryobj);
      let query1 = "INSERT INTO COMPANY (";
      let query2 = "VALUES (";

      let n = values.length;
      for (var i = 2; i < n - 2; i++) {
        const key = name[i];
        const value = values[i];
        query1 += key + ",";
        query2 += "'" + value + "',";
      }
      query1 = query1.slice(0, query1.length - 1);
      query2 = query2.slice(0, query2.length - 1);
      query1 += ")";
      query2 += ");";
      query1 += query2;
      
      var companyid;
      conn.query(query1, async function (err, rows) {
        companyid = await rows.insertId;
        awaiting();
        if (err) {
          return res.status(400).json({
            err,
          });
        }
      });

      function awaiting() {
        let values = [];
        //Insert into the link table for groups
        for (var i = 0; i < group.length; i++) {
          const temp = [companyid, group[i]];
          values.push(temp);
        }
        //If the given group size is greater than 0
        if (group.length > 0) {
          query = "INSERT INTO  G_LINK (C_ID,G_ID) VALUES ?";
          conn.query(query, [values], function (err, rows) {
            if (err) {
              return res.status(400).json({
                err,
              });
            }
          });
        }

        //Insert into the link table for modules
        values = [];
        for (var i = 0; i < module.length; i++) {
          const temp = [companyid, module[i]];
          values.push(temp);
        }
        //If the given module size is greater than 0
        if (module.length > 0) {
          query = "INSERT INTO  M_LINK (C_ID,M_ID) VALUES ?";
          conn.query(query, [values], function (err, rows) {
            if (err) {
              return res.status(400).json({
                err,
              });
            }
          });
        }
      }
    });

    return res.status(200).json({
      message: "Company created successfully!",
    });
  } catch (error) {
    console.log("Error creating new company", error);
  }
};

/*
@desc : function to delete a company from database
@route : company/deletecompany
@access: private
*/
exports.deletecompany = async (req, res, next) => {
  try {
    console.log("Company being deleted");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const c_id = req.body.c_id;
      //First delete the company from group link and module link table
      let query = "DELETE FROM M_LINK WHERE C_ID = " + c_id + ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });
      query = "DELETE FROM G_LINK WHERE C_ID = " + c_id + ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });

      //Delete the company from the main company table
      query = "DELETE FROM COMPANY WHERE C_ID = " + c_id + ";";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
      });
      res.status(200).json({
        message: "Company deleted successfully!",
      });
    });
  } catch (error) {
    console.log("Error in deleting company", error);
  }
};
/*
@desc : Get all the companies
@route : company/getallcompanies
@access : private
*/
exports.getallcompanies = async (req, res, next) => {
  console.log("Companies being fetched");
  try {
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      const query = "SELECT * FROM COMPANY";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
        res.status(200).json({
          rows,
        });
      });
    });
  } catch (error) {
    console.log("Error in fetching all the companis", err);
  }
};

/*
@desc : Edit Company details 
@route:
@access :private
*/