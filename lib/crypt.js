'use strict';
var crypto = require('crypto'),
  algorithm = 'aes-256-ctr', //'openssl list-cipher-algorithms' will display the available cipher algorithms.
  salt = 'd6F3Efeq',
  saltLength = salt.length;

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, salt);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return new Buffer(crypted).toString('base64');
}

function decrypt(text) {
  text = new Buffer(text, 'base64').toString('ascii');
  var decipher = crypto.createDecipher(algorithm, salt);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function generateHash(password, defSalt, defIterations) {
  var algorithm = 'md5';
  var salt = defSalt || generateSalt();
  var iterations = defIterations || Date.now().toString().slice(-2);
  try {
    var hash = password;
    for (var i = 0; i < iterations; ++i) {
      hash = crypto.createHmac(algorithm, salt).update(hash).digest('hex');
    }

    return algorithm + '$' + salt + '$' + iterations + '$' + hash;
  } catch (e) {
    throw new Error('Invalid message digest algorithm');
  }
}

function generateSalt() {
  var saltChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var len = saltChars.length;
  if (typeof len != 'number' || len <= 0 || len !== parseInt(len, 10)) throw new Error('Invalid salt length');
  if (crypto.randomBytes) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').substring(0, len);
  } else {
    for (var i = 0, salt = ''; i < len; i++) {
      salt += saltChars.charAt(Math.floor(Math.random() * len));
    }
    return salt;
  }
}

function makeBackwardCompatible(hashedPassword) {
  var parts = hashedPassword.split('$');
  if (parts.length === 3) {
    parts.splice(2, 0, 1);
    hashedPassword = parts.join("$");
  }

  return hashedPassword;
}

function verifyHash(password, hashedPassword) {
  if (!password || !hashedPassword) return false;
  hashedPassword = makeBackwardCompatible(hashedPassword);
  var parts = hashedPassword.split('$');
  if (parts.length !== 4) return false;
  try {
    return generateHash(password, parts[1], parts[2]) == hashedPassword;
  } catch (e) {
  }
  return false;
}


function isHashed(password) {
  if (!password) return false;
  return password.split('$').length == 4;
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  generateHash: generateHash,
  verifyHash: verifyHash,
  isHashed: isHashed
};
