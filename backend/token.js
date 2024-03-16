// Using Node.js's built-in crypto module to generate a secret key
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey);
