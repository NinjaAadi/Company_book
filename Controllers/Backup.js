const { exec } = require("child_process");
const { request } = require("http");

/*
@desc : Backup a database
@route : util/backup
@access : private
*/

exports.backup = async (req, res) => {
  try {
    const pass = req.body.password;
    if (!pass) {
      return res.status(400);
    }

    const ress =
      "mkdir backup;cd backup;rm dbname.sql;mysqldump --add-drop-table -u root -p" +
      pass +
      " client> dbname.sql";
    exec(ress, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return res.status(400);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return res.status(400);
      }
      console.log(`stdout: ${stdout}`);
    });
    return res.status(200).json({
      msg: "Backing",
    });
  } catch (error) {
    return res.status(400);
    console.log(error);
  }
};

/*
@desc : Restore a database
@route : util/restore
@access : private
*/
exports.restore = async (req, res) => {
  try {
    const pass = req.body.password;
    if (!pass) {
      return res.status(400);
    }
  
    const ress = "cd backup;mysql -u root -p" + pass + " client < dbname.sql";
    console.log(ress);
    exec(ress, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return res.status(400);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return res.status(400);
      }
      console.log(`stdout: ${stdout}`);
    });
    return res.status(200).json({
      msg: "restoring",
    });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
