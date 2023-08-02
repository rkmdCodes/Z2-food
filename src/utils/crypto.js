import CryptoJS from "crypto-js";

const secretKey = "asffydcfgcfjcyhvfyhvfghvsdf";

export function encryptAndSaveData(key, data) {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localStorage.setItem(key, encryptedData);
  }

  
}

export function decryptData(key) {
  const secret = "asffydcfgcfjcyhvfyhvfghvsdf";
   
  let encryptedData = "";
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    encryptedData = localStorage.getItem(key);
  }

  if (encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secret);
    const decryptedData = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );
    return decryptedData;
  }
  return null;
}
