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
      for (var i = 0; i < n; i++) {
        const key = name[i];
        if (
          key == "C_G_ID" ||
          key == "C_M_ID" ||
          key == "email" ||
          key == "password"
        ) {
          continue;
        }
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
        if (err) {
          console.log("Error is ", err);
          console.log(query1);
          console.log("error ".red);
          return res.status(400).json({
            err,
          });
        }
        companyid = await rows.insertId;
        awaiting();
      });

      function awaiting() {
        console.log(group.length, module.length);
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
              conn.release();
              return res.status(400).json({
                err,
              });
            }
          });
        }
      }
      conn.release();
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
      //First delete the company from group link and module link table and
      //Delete the company's contact list persons from the person's table
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
      query = "DELETE FROM C_PERSON WHERE C_ID = " + c_id + ";";
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
      conn.release();
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
      let c_data;
      const query = "SELECT * FROM COMPANY";
      conn.query(query, function (err, rows) {
        if (err) {
          throw err;
        }
        c_data = rows;
        if (c_data.length == 0) {
          return res.status(200).json({
            c_data: [],
          });
        }
        //Call the promise function
        createpromise();
      });

      //Create a promise and then call map all companies and then return data as a call back
      function createpromise() {
        console.log("Promise is being created...".yellow);
        const promise1 = new Promise((resolve, reject) => {
          map_allcompanies(resolve);
        });
        promise1.then(() => {
          //new promise being created for fetching all the persons name
          const promise2 = new Promise((resolve, reject) => {
            getpersons(resolve);
          });
          promise2.then(() => {
            console.log("Data being returned".green);
            returndata();
          });
        });
      }
      function getpersons(resolve) {
        let c_count = c_data.length;
        console.log("Persons being matched...");
        c_data.map((company) => {
          c_count--;
          fetchperson(resolve, company, c_count);
        });
      }
      function fetchperson(resolve, company, c_count) {
        const id = company.C_ID;
        let qquery = "SELECT * FROM C_PERSON WHERE C_ID = " + id + ";";
        company["C_PERSON"] = [];
        conn.query(qquery, function (err, rows) {
          if (err) {
            throw err;
          }
          company["C_PERSON"] = rows;
          if (c_count === 0) {
            resolve("Success");
          }
        });
      }
      //Function to return data after fetching the group and module ids
      function returndata() {
        return res.status(200).json({
          c_data,
        });
      }

      //Function to map for all the companies and fetch their data
      function map_allcompanies(resolve) {
        console.log("Data is being fetched for all companies".yellow);
        let count = c_data.length;
        c_data.map((company) => {
          count--;
          fetchdata(company, resolve, count);
        });
      }

      //Fetch data for each company
      function fetchdata(company, resolve, count) {
        console.log("fetchdata function is being called...".blue);
        const id = company.C_ID;
        company["C_G_ID"] = [];
        company["C_M_ID"] = [];
        let query = "SELECT * FROM G_LINK WHERE C_ID = " + id + ";";
        conn.query(query, function (err, rows) {
          for (i = 0; i < rows.length; i++) {
            company["C_G_ID"].push(rows[i].G_ID);
          }
        });
        query = "SELECT * FROM M_LINK WHERE C_ID = " + id + ";";
        conn.query(query, function (err, rows) {
          for (i = 0; i < rows.length; i++) {
            company["C_M_ID"].push(rows[i].M_ID);
          }
          //Resolve the promise when the query function gets completed
          if (count === 0) {
            console.log(
              "Promise is being resolved when the count becomes zero...".rainbow
            );
            resolve("Success!");
          }
        });
      }
      conn.release();
    });
  } catch (error) {
    console.log("Error in fetching all the companis", err);
  }
};

/*
@desc : Edit Company details 
@route: company/editcompany
@access :private
*/
exports.editcompany = async (req, res, next) => {
  try {
    console.log("Company details being modified...");
    mysql.getConnection(function (err, conn) {
      if (err) {
        throw err;
      }
      //Delete all the groups with this c_id
      //Delete all the modules with this c_id
      //Update all the fiels of the company
      mysql.getConnection(function (err, conn) {
        if (err) {
          throw err;
        }
        const queryobj = req.body;
        const companyid = req.body.C_ID;
        //Delete from the groups link
        let query = "DELETE FROM G_LINK WHERE C_ID = " + companyid + ";";
        conn.query(query, function (err, rows) {
          if (err) {
            throw err;
          }
        });

        //Delete from the module link
        query = "DELETE FROM M_LINK WHERE C_ID = " + companyid + ";";
        conn.query(query, function (err, rows) {
          if (err) {
            throw err;
          }
        });
        //Insert the new group link and module link
        const group = req.body.C_G_ID;
        const module = req.body.C_M_ID;
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

        //Now update the information for the table
        query = "UPDATE COMPANY SET ";
        const name = Object.keys(queryobj);
        const value = Object.values(queryobj);
        let n = value.length;
        for (var i = 0; i < n; i++) {
          const K = name[i];
          const V = value[i];
          if (
            K == "C_G_ID" ||
            K == "C_M_ID" ||
            K == "email" ||
            K == "password"
          ) {
            continue;
          }
          query += K + "=" + "'" + V + "',";
        }
        query = query.slice(0, query.length - 1);
        query += "WHERE C_ID = " + companyid + ";";
        conn.query(query, function (err, rows) {
          if (err) {
            throw err;
          }
        });
        conn.release();
        return res.status(200).json({
          message: "Company details updated successfully!",
        });
      });
      conn.release();
    });
  } catch (error) {
    console.log("Error in updating the company details", error);
  }
};
