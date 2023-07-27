import CryptoJS from 'crypto-js';

const secretKey = 'asffydcfgcfjcyhvfyhvfghvsdf'; 


export function encryptAndSaveData(data) {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  localStorage.setItem('encryptedData', encryptedData);
}


export function decryptData() {
  const encryptedData = localStorage.getItem('encryptedData');
  if (encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
  return null; 
}