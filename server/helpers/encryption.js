const CryptoJs = require("crypto-js");

//Encrypts Data 
const encrypt = (data) => {
    const cipherText = CryptoJs.AES.encrypt(data, process.env.ENCRYPTION_KEY).toString();
    return cipherText;
}

//Decrypts Data
const decryption = (encryptedData) => {
    const bytes = CryptoJs.AES.decrypt(encryptedData, process.env.ENCRYPTION_KEY);
    return bytes.toString(CryptoJs.enc.Utf8);
}

module.exports = {
    encrypt,
    decryption
}