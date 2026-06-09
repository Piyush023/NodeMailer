import https from 'https';
import crypto from 'crypto';
import fs from 'fs';

const a = 10;

const b = 20;

async function getData() {
  const resp = await fetch('https://dummyjson.com/products/1');
  const data = await resp.json();
  console.log(data, 'ASYNC AWAIT DATA');
}

getData();

https.get('https://dummyjson.com/products/1', (res) => {
  console.log(res, 'HTTP METHOD DATA');
});

setTimeout(() => {
  console.log('Hello World');
}, 5000);

// File System
fs.readFile('./data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data, 'FILE DATA');
  }
});

// Crypto System - Allow us to encrypt and decrypt data.
// pbkdf2 - Password Based Key Derivation Function 2
// This will take 6 arguments - password, Type of hash, iterations - No of time it will take to decrypt, key length - Length of the Generate key, digest - Type of ALGO, callback.
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) {
    console.error(err);
  } else {
    console.log(derivedKey, 'CRYPTO PBKDF2');
  }
});

// Sync version of the pbkdf2 - This will block the main thread and will not allow the other async operations to execute.
const derivedKey = crypto.pbkdf2Sync('password', 'salt', 100000, 64, 'sha512');
console.log(derivedKey, 'CRYPTO PBKDF2 SYNC');

const hash = crypto.createHash('sha256').update('Hello World').digest('hex');

console.log(hash, 'CRYPTO HASH');

function multiply(a, b) {
  return a * b;
}

const c = multiply(a, b);

console.log(c);

/*
Output - 

Multiply function will be executed first and then the file system read, then API call and then in the last setTimeout will be executed. - 

200
File System.
API Call Result
Hello World of setTimeout

and this is cause of the Sync nature of the V8 engine, and then the execution of the async operations by libuv which will pawned of libuv along with a callback function  which will get executed once the global execution context is complete executing the sync code in the function.

*/
