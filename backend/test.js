const fetch = require('node-fetch');

fetch('http://localhost:5000/api/stats')
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
