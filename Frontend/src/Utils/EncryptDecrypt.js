const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

export const encrypt = (s) => {
  return cryptr.encrypt(s);
};
export const decrypt = (s) => {
  return cryptr.decrypt(s);
};
