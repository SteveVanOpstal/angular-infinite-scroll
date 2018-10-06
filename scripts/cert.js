const fs = require('fs');

if (!fs.existsSync('./secure')) {
  fs.mkdirSync('./secure');
}

if (fs.existsSync('./secure/cert.crt')) {
  return 1;
}

const selfsigned = require('selfsigned');
const pems = selfsigned.generate([{name: 'commonName', value: 'localhost'}], {
  algorithm: 'sha256',
  keySize: 2048,
  extensions: [{
    name: 'subjectAltName',
    altNames: [{
      type: 2,  // DNS
      value: 'localhost'
    }]
  }]
});

fs.writeFileSync('./secure/cert.crt', pems.cert, {encoding: 'utf-8'});
fs.writeFileSync('./secure/cert.key', pems.private, {encoding: 'utf-8'});
fs.writeFileSync('./secure/cert.pem', pems.private + pems.cert, {encoding: 'utf-8'});
