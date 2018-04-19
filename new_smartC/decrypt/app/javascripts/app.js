var crypto = require("crypto");
var eccrypto = require("eccrypto");
 
function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}
function toByteArray(hexString) {
  var result = [];
  while (hexString.length >= 2) {
    result.push(parseInt(hexString.substring(0, 2), 16));
    hexString = hexString.substring(2, hexString.length);
  }
  return result;
}
var publicKey = toByteArray("b3f6e8f6ef52d462504a1a0d5ab01c55bb86fd23");
var privateKeyA = toByteArray("cc17bfddb14c20c3bfd0f75a3dd1a8f32a33a2c7ce367b56572140a1aeb6711c");
var publicKeyA = eccrypto.getPublic(privateKeyA);
console.log(publicKeyA.toString('hex'));
console.log(publicKey);
var privateKeyB = crypto.randomBytes(32);
var publicKeyB = eccrypto.getPublic(privateKeyB);
 
// Encrypting the message for B. 
eccrypto.encrypt(publicKeyB, Buffer("msg to b")).then(function(encrypted) {
  // B decrypting the message. 
  eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
    console.log("Message to part B:", plaintext.toString());
  });
});
 
// Encrypting the message for A. 
eccrypto.encrypt(publicKeyA, Buffer("msg to a")).then(function(encrypted) {
  // A decrypting the message. 
  eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
    console.log("Message to part A:", plaintext.toString());
  });
});
$("#button").click(function(){
  
})