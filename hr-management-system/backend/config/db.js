// backend/config/db.js
const mongoose = require('mongoose');

const dbConfig = {
  development: {
    url: 'mongodb://localhost/hr-management-system',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  production: {
    url: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

const env = process.env.NODE_ENV || 'development';

mongoose.connect(dbConfig[env].url, dbConfig[env].options);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;