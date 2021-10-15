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
      "del backup\\dbname.sql && \"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysqldump.exe\" -u root  -proot  client > .\\backup\\dbname.sql";
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
    console.log(error);
    return res.status(400);
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

    const ress = "\"C:\\Program Files\\MySQL\\MySQL Server 5.7\\bin\\mysql.exe\" -u root -proot client < .\\backup\\dbname.sql";

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
