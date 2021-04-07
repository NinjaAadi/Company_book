const bcrypt = require("bcryptjs");

//Function to hash the password
exports.hash = async (password) => {
  console.log("Hash function running...");

  const salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

//Function to check the password with the encrypted password
exports.matchpass = async (pass, originalpass) => {
  return bcrypt.compare(pass, originalpass);
};
