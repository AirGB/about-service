const {Client} = require('pg');

const client = new Client({
  user: 'kerogiro',
  host: process.env.DB || 'localhost',
  database: 'rental_hosts',
});

client.connect((err) => {
  if (err) {
    console.log('error connecting to postgres');
  } else {
    console.log('connected to postgres');
  }
});

module.exports = client;
